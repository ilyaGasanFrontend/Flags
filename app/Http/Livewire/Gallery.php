<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\WithPagination;
use Livewire\TemporaryUploadedFile;

use App\Models\Image;
use App\Models\test;
use App\Models\Category;

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

    private function unzip($tmp_filename)
    {
        // dd(storage_path('app\\livewire-tmp\\' . $filename));
        //путь до файла
        $path = storage_path('app\\livewire-tmp\\' . $tmp_filename);

        //работа с архивом
        $zip = new \ZipArchive();
        $zip->open($path);

        for ($i = 0; $i < $zip->count(); $i++) {
            $filename = $zip->getNameIndex($i);

            // расширение файла
            $ext = pathinfo($filename, PATHINFO_EXTENSION);

            $unique_filename = uniqid() . '.' . $ext;

            if ($ext == 'png' || $ext ==  'jpg' || $ext ==  'bmp') {
                // $zip->extractTo(public_path('storage\\archives\\' . auth()->user()->name), $zip->getNameIndex($i));
                $zip->extractTo(public_path('storage\\photos\\'), $filename);

                $width = \getimagesize(public_path('storage\\photos\\') . $filename)[0];
                $height = \getimagesize(public_path('storage\\photos\\') . $filename)[1];

                image::create([
                    'user_id' => auth()->user()->id,
                    'original_name' => $filename,
                    'hash_name' => $filename,
                    'path_to_file' => '/storage/photos/' . $filename,
                    'original_width' =>  $width,
                    'original_height' => $height,

                ]);
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
        Storage::delete('/public/photos/' . $filename);
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
            fwrite($file, $item->original_width . PHP_EOL);
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
