<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\WithPagination;
use Livewire\TemporaryUploadedFile;

use App\Models\Image;
use App\Models\test;
use App\Models\Category;

use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;



use League\Flysystem\Filesystem;


class Gallery extends Component
{
    use WithFileUploads;
    use WithPagination;

    protected $paginationTheme = 'bootstrap';

    public $test = [];
    public $files = [];

    public $test_files = [];
    public $in_progress = 123;

    public $images;
    public $col_md = 3;
    public $filter = true;
    public $is_image = false;


    //chunk file upload
    public $chunkSize = 12000000; // 12 MB
    public $fileChunk;

    public $fileName;
    public $fileSize;

    public $finalFile;

    public function updatedFileChunk()
    {
        /*
        Загрузка файла чанками взята с сайта:

        https://fly.io/laravel-bytes/chunked-file-upload-livewire/

        */
        $chunkFileName = $this->fileChunk->getFileName();
        $finalPath = Storage::path('/livewire-tmp/' . $this->fileName);
        $tmpPath   = Storage::path('/livewire-tmp/' . $chunkFileName);
        $file = fopen($tmpPath, 'rb');
        $buff = fread($file, $this->chunkSize);
        fclose($file);

        $final = fopen($finalPath, 'ab');
        fwrite($final, $buff);
        fclose($final);
        unlink($tmpPath);
        $curSize = Storage::size('/livewire-tmp/' . $this->fileName);
        if ($curSize == $this->fileSize) {
            $this->finalFile =
                TemporaryUploadedFile::createFromLivewire('/' . $this->fileName);
            $this->unzip($this->fileName);
        }
    }

    private function unzip($tmp_path, $tmp_filename)
    {
        // dd(storage_path('app\\livewire-tmp\\' . $filename));
        //путь до файла
        $path = $tmp_path . '/' . $tmp_filename;
        // dd($path, 'unzip');

        //работа с архивом
        $zip = new \ZipArchive();
        if ($zip->open($path)) {

            for ($i = 0; $i < $zip->count(); $i++) {
                $filename = $zip->getNameIndex($i);

                // расширение файла
                $ext = pathinfo($filename, PATHINFO_EXTENSION);

                // $unique_filename = uniqid() . '.' . $ext;

                if ($this->isImage($ext)) {

                    // $zip->extractTo(public_path('storage\\archives\\' . auth()->user()->name), $zip->getNameIndex($i));
                    if ($zip->extractTo($tmp_path . '/', $filename)) {

                        $path_to_file = Storage::putFile('public/photos/' . auth()->user()->name, new File($tmp_path . '/' . $filename));
                        $hash_filename = pathinfo(storage_path('app/' . $path_to_file), PATHINFO_FILENAME) . '.' . $ext;

                        $width = \getimagesize(storage_path('app/' . $path_to_file))[0];
                        $height = \getimagesize(storage_path('app/' . $path_to_file))[1];

                        image::create([
                            'user_id' => auth()->user()->id,
                            'original_name' => $filename,
                            'hash_name' => $hash_filename,
                            'path_to_file' => '/storage/photos/' . auth()->user()->name . '/' . $hash_filename,
                            'original_width' =>  $width,
                            'original_height' => $height,

                        ]);
                    }
                }
            }
        }
        // $zip->extractTo(storage_path('app\\livewire-tmp\\'));
    }

    public function updatedPhoto()
    {
        $this->validate([
            'photo.*' => 'image|max:1024', // 1MB Max
        ]);
    }

    public function updatedFiles()
    {
        $this->is_image = false;

        $this->validate([
            'files.*' => 'image',
        ]);

        $this->is_image = true;
    }

    public function updatedTest()
    {
        $this->validate(
            [
                'test.*' => ['required', 'mimes:zip,jpg', 'max:2048000'],
            ],
            [
                'required' => 'Вы не выбрали файл!',
                'mimes' => ':attribute должен быть следующего типа: zip, rar, png, jpg, jpeg!',
                'max' => 'Размер файла не должен превышать 2Гбайт!'
            ],
            [
                'test.*' => 'Файл',
            ],
        );
    }

    public function test_file_upload()
    {
        $this->validate(
            [
                'test.*' => ['required', 'mimes:zip,jpg', 'max:40000'],
            ],
            [
                'required' => 'Вы не выбрали файл!',
                'mimes' => ':attribute должен быть следующего типа: zip, rar, png, jpg, jpeg!',
                'max' => 'Размер файла не должен превышать 2Гбайт!'
            ],
            [
                'test.*' => 'Файл',
            ],
        );

        if (!Storage::disk('public')->has('photos/' . auth()->user()->name . '/')) {
            Storage::disk('public')->makeDirectory('photos/' . auth()->user()->name . '/');
        }

        foreach ($this->test as $file) {
            if ($this->isImage($file->extension())) {
                // dd($file->temporaryUrl());

                // $path = Storage::putFile('photos', new File('/'))
                $file->store('photos/' . auth()->user()->name . '/', 'public');

                $width = \getimagesize(public_path('storage/photos/' . auth()->user()->name . '/') . $file->hashName())[0];
                $height = \getimagesize(public_path('storage/photos/' . auth()->user()->name . '/') . $file->hashName())[1];

                image::create(
                    [
                        'user_id' => auth()->user()->id,
                        'original_name' => $file->getClientOriginalName(),
                        'hash_name' => $file->hashName(),
                        'path_to_file' => '/storage/photos/' . auth()->user()->name . '/' . $file->hashName(),
                        'original_width' =>  $width,
                        'original_height' => $height,
                    ]
                );
            } else if ($this->isArchive($file->extension())) {
                $this->unzip($file->getPath(), $file->getFileName());
                // dd($file->getPath(), $file->getFileName());
            }
        }
        // dd(public_path('storage/photos/' . auth()->user()->name . '/'));
    }

    public function yolo()
    {
        $dir = public_path('storage/exports/'); // . 'admin_flags_work_' . date('d_m_Y') . '.' . $dtype;
        $filename = auth()->user()->name . '_flags_work_' . date('d_m_Y');

        $zip = new \ZipArchive();
        $zip_file = $dir . $filename . '.zip';
        $zip->open($zip_file, \ZipArchive::CREATE | \ZipArchive::OVERWRITE);


        //создание yaml конфига
        $file = fopen($dir . $filename . '.yaml', 'w');

        fwrite($file, 'path: ../datasets/' . auth()->user()->name . '_flags_work_' . date('d_m_Y') . PHP_EOL);
        fwrite($file, 'train: images/train' . PHP_EOL);
        fwrite($file, 'val: images/val' . PHP_EOL);
        fwrite($file, PHP_EOL);
        fwrite($file, 'names:' . PHP_EOL);

        $classes = Category::where('user_id', auth()->user()->id)->pluck('description')->toArray();

        foreach ($classes as $i => $class) {
            fwrite($file, "\t$i: $class" . PHP_EOL);
        }
        fclose($file);

        $zip->addFile($dir . $filename . '.yaml',  $filename . '/' . $filename . '.yaml');

        //фотографии
        $images = Image::select('hash_name', 'original_name')->where('user_id', auth()->user()->id)->where('is_ready', 1)->get();
        foreach ($images as $image) {
            $labels = test::select(
                'images.original_name',
                'tests.category_id',
                'tests.label_id',
                'tests.x',
                'tests.y',
                'tests.width',
                'tests.height',
                'images.original_width',
                'images.original_height'
            )
                ->join('images', 'tests.photoName', '=', 'images.id')
                // ->join('categories', 'tests.category_id', '=', 'categories.id')
                ->where('tests.user_id', auth()->user()->id)
                ->where('images.original_name', $image->original_name)
                // ->orderBy('images.id')
                // ->orderBy('label_id')
                ->get();
            $name = pathinfo(public_path('storage/photos/' . $image->hash_name), PATHINFO_FILENAME);
            // dd($filename);
            $label_file = fopen($dir . $name . '.txt', 'w');
            // dd($dir . $filename . '.txt');
            foreach ($labels as $label) {

                fwrite($label_file, $label->category_id . ' ');
                fwrite($label_file, ($label->x + $label->width / 2) / $label->original_width . ' ');
                fwrite($label_file, ($label->y + $label->height / 2) / $label->original_height . ' ');
                fwrite($label_file, $label->width / $label->original_width . ' ');
                fwrite($label_file, $label->height / $label->original_height . PHP_EOL);
                // dd($label->category_id);
            }
            fclose($label_file);
            $zip->addFile($dir . $name . '.txt', $filename . '/' . 'labels/train/' . $name . '.txt');
            $zip->addFile(public_path('storage/photos/' . $image->hash_name), $filename . '/' . 'images/train/' . $image->hash_name);
        }


        $zip->close();
        return response()->download($zip_file);
    }

    private function isImage($ext)
    {
        $extensions = ['jpg', 'jpeg', 'png'];

        return in_array($ext, $extensions);
    }

    private function isArchive($ext)
    {
        $extensions = ['rar', 'zip'];

        return in_array($ext, $extensions);
    }

    public function check_if_zip()
    {
        // dd($this->files);
        // $this->validate([
        //     'files.*' => 'image|max:1024',
        // ]);

        // $this->tatata = 321;
    }

    public function view_switch($param)
    {
        // use paginate;

        if ($param == true) {
            // if ($this->col_md != 2) {
            //     $this->col_md++;
            // }
            $this->col_md = 3;
            // return redirect()->to('gallery?page='.$page);
        } else {
            // if ($this->col_md != 2) {
            //     $this->col_md--;
            // }
            $this->col_md = 2;
            // return redirect()->to('gallery?page='.$page);
        }
    }
    public function delete($image_id)
    {
        $filename = Image::find($image_id)->hash_name;
        Storage::delete('/public/photos/' . auth()->user()->name . '/' . $filename);
        Image::where('id', $image_id)->delete();
    }

    public function create_sql_view($json)
    {
        if ($json) {
            $sql_view = test::select(
                'images.original_name',
                'tests.label_id',
                'categories.description',
                'tests.x',
                'tests.y',
                'tests.width',
                'tests.height',
                'images.original_width',
                'images.original_height'
            )
                ->join('images', 'tests.photoName', '=', 'images.id')
                ->join('categories', 'tests.category_id', '=', 'categories.id')
                ->orderBy('images.id')
                ->orderBy('label_id')
                ->toJson();
        } else {
            $sql_view = test::select(
                'images.original_name',
                'tests.label_id',
                'categories.description',
                'tests.x',
                'tests.y',
                'tests.width',
                'tests.height',
                'images.original_width',
                'images.original_height'
            )
                ->where('tests.user_id', auth()->user()->id)
                ->join('images', 'tests.photoName', '=', 'images.id')
                ->join('categories', 'tests.category_id', '=', 'categories.id')
                ->orderBy('images.id')->orderBy('label_id')->get();
        }

        return $sql_view;
    }

    private function create_file($sql, $dtype)
    {
        $dir = public_path('storage') . '/exports/' . 'admin_flags_work_' . date('d_m_Y') . '.' . $dtype;
        $file = fopen($dir, 'w');
        fwrite($file, 'name,label_id,category,x,y,width,height,original_width,original_height' . PHP_EOL);
        foreach ($sql as $item) {
            fwrite($file, $item->original_name . ',');
            fwrite($file, $item->label_id . ',');
            fwrite($file, $item->description . ',');
            fwrite($file, $item->x . ',');
            fwrite($file, $item->y . ',');
            fwrite($file, $item->width . ',');
            fwrite($file, $item->height . ',');
            fwrite($file, $item->original_width . ',');
            fwrite($file, $item->original_height . PHP_EOL);
        }
        fclose($file);

        return $dir;
    }

    public function download_file($dtype)
    {
        if ($dtype == 'json') {
            $query = test::select(
                'images.name',
                'tests.label_id',
                'tests.x',
                'tests.y',
                'tests.width',
                'tests.height',
                'images.original_width',
                'images.original_height'
            )->join('images', 'tests.photoName', '=', 'images.id')->toJson();
        } else {
            $query = $this->create_sql_view(false);
            $file = $this->create_file($query, $dtype);
        }
        // Storage::download($file);
        return response()->download($file);
    }
    public function submit()
    {
        dd(123);
    }

    public function test()
    {
        return redirect()->to('/gallery?page=2');
    }
    public function store_s3()
    {
        $this->validate([
            'files.*' => 'image',
        ]);

        foreach ($this->files as $file) {
            $file->storePublicly('livewire-imgs', 's3');
        }
    }

    public function alert()
    {
        $this->dispatchBrowserEvent('modal-confirm-hide', ['message' => 'Необходимо создать категории!']);
    }

    public function store_zip(Request $request)
    {
        dd($request);
    }


    public function store_photos()
    {
        // dd(public_path('storage'));
        $this->validate([
            'files.*' => 'image',
        ]);

        foreach ($this->files as $file) {
            // storage::path('public') "E:\Projects\FlagsOcta\storage\app\public"
            // public_path('storage') "E:\Projects\FlagsOcta\public\storage"
            $file->store('photos', 'public');
            $width = \getimagesize(public_path('storage') . '/photos/' . $file->hashName())[0];
            $height = \getimagesize(public_path('storage') . '/photos/' . $file->hashName())[1];

            image::create([
                'user_id' => auth()->user()->id,
                'original_name' => $file->getClientOriginalName(),
                'hash_name' => $file->hashName(),
                'path_to_file' => '/storage/photos/' . $file->hashName(),
                'original_width' =>  $width,
                'original_height' => $height,

            ]);
        }

        // return redirect()->to('/gallery');

    }

    public function render()
    {
        if ($this->filter) {
            $this->images = Image::where('is_ready', 0)->where('user_id', auth()->user()->id)->get();
            // $paginate = Image::where('is_ready', 0)->where('user_id', auth()->user()->id)->cursorPaginate(2);
            $paginate = Image::where('is_ready', 0)->where('user_id', auth()->user()->id)->paginate(12);
        } else {
            $this->images = Image::all()->where('user_id', auth()->user()->id);
            // $paginate = Image::all()->where('user_id', auth()->user()->id)->cursorPaginate(2);
            $paginate = Image::where('user_id', auth()->user()->id)->paginate(12);
        }

        if (Category::where('user_id', auth()->user()->id)->count() == 0) {
            $is_empty = true;
        } else {
            $is_empty = false;
        }

        // $this->images = DB::table('images')->get();
        return view('livewire.gallery', compact([
            'is_empty', 'paginate',
        ]))->extends('layouts.app');
    }
}
