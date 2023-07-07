<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\TemporaryUploadedFile;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

use App\Models\Image;
use Exception;
use Illuminate\Contracts\Cache\Store;

class FileUploader extends Component
{
    use WithFileUploads;

    public $files = [];
    public $total_files;
    public $files_ready = 0;

    // public $progress;

    public $chunkSize = 5_000_000; //~5 MB

    public function updatedFiles($value, $key)
    {
        // dd($this->total_files);
        
        list($index, $attribute) = explode('.', $key);
        if ($attribute == 'fileChunk') {
            $fileDetails = $this->files[intval($index)];
            // dd($this->files);
            // Final File
            $fileName  = $fileDetails['fileName'];
            $finalPath = Storage::path('/livewire-tmp/' . $fileName);
            // dd($finalPath);
            // Chunk File
            $chunkName = $fileDetails['fileChunk']->getFileName();
            $chunkPath = Storage::path('/livewire-tmp/' . $chunkName);
            try {
                $chunk      = fopen($chunkPath, 'rb');
                $buff       = fread($chunk, $this->chunkSize);
                fclose($chunk);

                // Merge Together
                $final = fopen($finalPath, 'ab');
                fwrite($final, $buff);
                fclose($final);
                unlink($chunkPath);

                // Progress
                $curSize = Storage::size('/livewire-tmp/' . $fileName);
                $this->files[$index]['progress'] =
                    $curSize / $fileDetails['fileSize'] * 100;

                if ($this->files[$index]['progress'] == 100) {
                    $this->files[$index]['fileRef'] =
                        TemporaryUploadedFile::createFromLivewire(
                            '/' . $fileDetails['fileName']
                        );

                        $this->files_ready++;
                }
            } catch (Exception $e) {
                $this->dispatchBrowserEvent('modal-confirm-hide', [
                    'message' => 'Не удалось загрузить файл ' . $fileName
                ]);
                // array_splice($this->files, $index, 1);
                // $this->total_files--;
                return;
            }
            // $chunk      = fopen($chunkPath, 'rb');
            // $buff       = fread($chunk, $this->chunkSize);
            // fclose($chunk);

            // // Merge Together
            // $final = fopen($finalPath, 'ab');
            // fwrite($final, $buff);
            // fclose($final);
            // unlink($chunkPath);

            // // Progress
            // $curSize = Storage::size('/livewire-tmp/' . $fileName);
            // $this->files[$index]['progress'] =
            //     $curSize / $fileDetails['fileSize'] * 100;

            // if ($this->files[$index]['progress'] == 100) {
            //     $this->files[$index]['fileRef'] =
            //         TemporaryUploadedFile::createFromLivewire(
            //             '/' . $fileDetails['fileName']
            //         );

            //     $this->files_ready++;
            // }
        }
    }

    private function unzip(TemporaryUploadedFile $file)
    {

        // $max_exec_time = ini_get('max_execution_time');
        // dd($max_exec_time);
        $zip = new \ZipArchive();

        if ($zip->open($file->getRealPath())) {
            set_time_limit(0);
            for ($i = 0; $i < $zip->count(); $i++) {
                $original_filename = $zip->getNameIndex($i);
                // dd($zip->getNameIndex($i));
                // dd(Storage::path('livewire-tmp/'));
                $zip->extractTo(Storage::path('/livewire-tmp/'), $original_filename);
                $tmp_file = new TemporaryUploadedFile($original_filename, 'local');

                $validator = Validator::make(
                    ['file' => $tmp_file],
                    ['file' => 'image']
                );

                if ($validator->fails()) {
                    unset($tmp_file);
                } else {
                    $path = Storage::putFileAs('public/photos/' . auth()->user()->name, new File($tmp_file->getRealPath()), $tmp_file->hashName());

                    $width = \getimagesize(Storage::path($path))[0];
                    $height = \getimagesize(Storage::path($path))[1];

                    image::create(
                        [
                            'user_id' => auth()->user()->id,
                            'original_name' => $original_filename,
                            'hash_name' => $tmp_file->hashName(),
                            'path_to_file' => '/storage/photos/' . auth()->user()->name . '/' . $tmp_file->hashName(),
                            'original_width' =>  $width,
                            'original_height' => $height,
                        ]
                    );

                    unset($tmp_file);
                }
            }
        }
    }

    public function store_files()
    {
        // dd($this->files);
        foreach ($this->files as $file) {
            $tmp_file = $file['fileRef'];
            // dd($tmp_file);
            $original_filename = $file['fileName'];
            $validator = Validator::make(
                ['file' => $tmp_file],
                ['file' => 'image']
            );

            if ($validator->fails()) {
                $validator = Validator::make(
                    [
                        'file' => $tmp_file
                    ],
                    [
                        'file' => [
                            'mimes:zip',
                            'max:2097152',
                        ]
                    ],
                    [
                        'mimes' => 'Файл :attribute долен быть фотографией или архивом!',
                        'max' => 'Размер файла :attribute не должен превышать 2ГБайт!',
                    ],
                    [
                        'file' => $original_filename
                    ],
                );

                if (!$validator->fails()) {
                    $this->unzip($tmp_file);
                } else {
                    $this->dispatchBrowserEvent('modal-confirm-hide', [
                        'message' => $validator->getMessageBag()->first()
                    ]);
                }
            } else {
                $path = Storage::putFileAs('public/photos/' . auth()->user()->name, new File($tmp_file->getRealPath()), $tmp_file->hashName());
                // dd($path, public_path(), Storage::path($path));
                $width = \getimagesize(Storage::path($path))[0];
                $height = \getimagesize(Storage::path($path))[1];
                // dd($tmp_file->hashName());
                image::create(
                    [
                        'user_id' => auth()->user()->id,
                        'original_name' => $original_filename,
                        'hash_name' => $tmp_file->hashName(),
                        'path_to_file' => '/storage/photos/' . auth()->user()->name . '/' . $tmp_file->hashName(),
                        'original_width' =>  $width,
                        'original_height' => $height,
                    ]
                );
            }
        }
        $this->files = [];

        $this->emit('AddFiles');
    }

    public function render()
    {
        // if (!Storage::disk('local')->has('livewire-tmp/' . auth()->user()->name . '/'))
        // {
        //     Storage::disk('local')->makeDirectory('livewire-tmp/' . auth()->user()->name . '/');
        // }
        return view('livewire.file-uploader');
    }
}
