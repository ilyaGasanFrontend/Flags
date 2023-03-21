<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;
use App\Models\Image;
use App\Models\test;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class Gallery extends Component
{
    use WithFileUploads;
    public $test = [];
    public $files = [];
    public $images;

    public $filter = False;
    public function render()
    {
        if ($this->filter) {
            $this->images = Image::where('is_ready', 0)->get();
        } else {
            $this->images = Image::all();
        }
        
        // $this->images = DB::table('images')->get();
        return view('livewire.gallery')->extends('layouts.app');
    }

    
    public function create_sql_view($json)
    {
        if ($json)
        {
            $sql_view = test::select(
                'images.name', 'tests.label_id', 'tests.x', 'tests.y', 'tests.width', 'tests.height', 'images.original_width', 'images.original_height'
                )->join('images', 'tests.photoName', '=', 'images.id')->orderBy('images.id')->orderBy('label_id')->toJson();
        }
        else
        {
            $sql_view = test::select(
                'images.name', 'tests.label_id', 'tests.x', 'tests.y', 'tests.width', 'tests.height', 'images.original_width', 'images.original_height'
                )->join('images', 'tests.photoName', '=', 'images.id')->orderBy('images.id')->orderBy('label_id')->get();
        }
        
        return $sql_view;
    }

    private function create_file($sql, $dtype)
    {
        $dir = public_path('storage') . '/exports/' . 'admin_flags_work_' . date('d_m_Y') . '.' . $dtype;
        $file = fopen($dir, 'w');
        fwrite($file, 'name,label_id,x,y,width,height,original_width,original_height' . PHP_EOL);
        foreach ($sql as $item) {
            fwrite($file, $item->name . ',');
            fwrite($file, $item->label_id . ',');
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
        if ($dtype == 'json')
        {
            $query = test::select(
                'images.name', 'tests.label_id', 'tests.x', 'tests.y', 'tests.width', 'tests.height', 'images.original_width', 'images.original_height'
                )->join('images', 'tests.photoName', '=', 'images.id')->toJson();

        }
        else 
        {
            $query = $this->create_sql_view(false);
            $file = $this->create_file($query, $dtype);
        }
        // Storage::download($file);
        return response()->download($file);
    }
    public function submit()
    {
        image::create([
            'name' => '',
            'path_to_file' => '',
            'original_width' => '',
            'original_height' => '',

        ]);
    }

    public function test()
    {
        foreach ($this->test as $test) {
            dd($this->test);
        }
        
    }
    public function store_s3()
    {
        $this->validate([
            'files.*' => 'image',
        ]);

        foreach ($this->files as $file)
        {
            $file->storePublicly('livewire-imgs', 's3');
        }
        
    }
    public function store_photos()
    {
        $this->validate([
            'files.*' => 'image',
        ]);

        foreach ($this->files as $file ) {
            // storage::path('public') "E:\Projects\FlagsOcta\storage\app\public"
            // public_path('storage') "E:\Projects\FlagsOcta\public\storage"
            $file->store('photos', 'public');
            $width = \getimagesize(public_path('storage') . '/photos/' . $file->hashName())[0];
            $height = \getimagesize(public_path('storage') . '/photos/' . $file->hashName())[1];

            image::create([
                'user_id' => auth()->user()->id,
                'name' => $file->hashName(),
                'path_to_file' => '/storage/photos/' . $file->hashName(),
                'original_width' =>  $width,
                'original_height' => $height,
            
            ]);
        }
        // $this->photo->store('livewire-imgs', 's3');
        // $this->photo->store('photos', 'public'); 
        // $width = \getimagesize('E:/Projects/FlagsOcta/public/storage/photos/' . $this->photo->hashName())[0];
        // $height = \getimagesize('E:/Projects/FlagsOcta/public/storage/photos/' . $this->photo->hashName())[1];
        // image::create([
        //     'name' => $this->photo->hashName(),
        //     'path_to_file' => '/storage/photos/' . $this->photo->hashName(),
        //     'original_width' =>  $width,
        //     'original_height' => $height,
            
        // ]);
        
        return redirect()->to('/gallery');
        // dump($this->photo->hashName());
    }
}
