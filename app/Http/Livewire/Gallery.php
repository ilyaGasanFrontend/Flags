<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;
use App\Models\Image;
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

    public function filter()
    {
        $this->filter = !$this->filter;
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
            $file->store('photos', 'public');
            $width = \getimagesize('E:/Projects/FlagsOcta/public/storage/photos/' . $file->hashName())[0];
            $height = \getimagesize('E:/Projects/FlagsOcta/public/storage/photos/' . $file->hashName())[1];
            image::create([
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
