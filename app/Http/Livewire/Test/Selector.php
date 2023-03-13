<?php

namespace App\Http\Livewire\Test;

use Livewire\Component;
use App\Models\test;

class Selector extends Component
{
    public $x;
    public $y;
    public $width;
    public $height;

    public function render()
    {
        return view('livewire.test.selector')->extends('layouts.app');
    }

    public function createArticle()
    {
        dump("created" . $this->x);
        // test::create([
        //     'username' => 'admin',
        //     'photoname' => 'test',
        //     'x' => $this->x,
        //     'y' => $this->y,
        //     'width' => $this->width,
        //     'height' => $this->height,

        // ]);
        // $validatedData = $this->validate([
        //     'data' => 'required'
        // ]);

        // test::create([
        //     'x' => $this->x,
        // ]);
        // return redirect()->to('/db');
        //return var_dump($var);
    }
}
