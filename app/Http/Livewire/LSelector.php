<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\test;

class LSelector extends Component
{
    public $x;
    public $y;
    public $width;
    public $height;

    // protected $rules = [
    //     'x' => 'required',
    // ];

    public function submit()
    {
        $arr_x;
        $arr_y;
        $arr_width;
        $arr_height;

        $arr_x = explode('px,', substr($this->x, 0, -2)); 
        $arr_y = explode('px,', substr($this->y, 0, -2)); 
        $arr_width = explode('px,', substr($this->width, 0, -2)); 
        $arr_height = explode('px,', substr($this->height, 0, -2)); 

        // dump($arr_x);
        for ($i=0; $i < count($arr_x); $i++) { 
            test::create([
                'userName' => 'admin',
                'photoName' => 'admin',
                'x' => $arr_x[$i],
                'y' => $arr_y[$i],
                'width' => $arr_width[$i],
                'height' => $arr_height[$i],
            ]);
        }
        // foreach ($arr_x as $item) {
            // test::create([
            //     'userName' => 'admin',
            //     'photoName' => 'admin',
            //     'x' => $item,
            //     'y' => 1024,
            //     'width' => 1024,
            //     'height' => 1024,
            // ]);
        // }
        

        // return redirect()->to('db');
    }

    public function render()
    {
        return view('livewire.l-selector')->extends('layouts.app');
    }
}
