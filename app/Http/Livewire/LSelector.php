<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\test;
use App\Models\Image;

class LSelector extends Component
{
    public $test = [];
    protected $listeners = ['submit'];

    public $img_scale;
    public $x;
    public $y;
    public $width;
    public $height;

    public $param; //передача id фотки во вьюху

    public $images; //массив данных из таблицы images

    public $nav_images = []; //фотографии в панель навигации
    public $squares;

    public $delete;
    // protected $rules = [
    //     'x' => 'required',
    // ];

    public function test()
    {
    }

    public function delete_row()
    {
        $arr_delete = explode(',', $this->delete);
        if (($arr_delete[0] != '')) {
            if (Image::find($this->param)->getOriginal('is_ready') == true) {
                foreach ($arr_delete as $id) {
                    Test::where('photoName', $this->param)->where('label_id', $id+1)->delete();
                    
                    $count = Test::where('photoName', $this->param)->where('label_id', '>', $id+1)->count();

                    for ($i = $id+1; $i <= $id + 1 + $count; $i++)
                    {
                        Test::where('photoName', $this->param)->where('label_id', $i)->update(['label_id' => $i-1]);
                    }
                
                }
            }
        }
        $this->dispatchBrowserEvent('page_refresh_prevent');
    }
    public function submit()
    {
        // $arr_x;
        // $arr_y;
        // $arr_width;
        // $arr_height;
        $arr_x = explode('px,', substr($this->x, 0, -2)); 
        $arr_y = explode('px,', substr($this->y, 0, -2)); 
        $arr_width = explode('px,', substr($this->width, 0, -2)); 
        $arr_height = explode('px,', substr($this->height, 0, -2)); 
        $arr_delete = explode(',', $this->delete);
        
        if (($arr_delete[0] != '')) {
            if (Image::find($this->param)->getOriginal('is_ready') == true) {
                foreach ($arr_delete as $id) {
                    Test::where('photoName', $this->param)->where('label_id', $id+1)->delete();
                    
                    $count = Test::where('photoName', $this->param)->where('label_id', '>', $id+1)->count();

                    for ($i = $id+1; $i <= $id + 1 + $count; $i++)
                    {
                        Test::where('photoName', $this->param)->where('label_id', $i)->update(['label_id' => $i-1]);
                    }
                
                }
            }
        }
        

        for ($i=0; $i < count($arr_x); $i++) { 
            test::updateOrCreate(
                ['photoName' => $this->param, 'label_id' => $i+1],
                [
                    'userName' => 'admin',
                    'x' => $arr_x[$i],
                    'y' => $arr_y[$i],
                    'width' => $arr_width[$i],
                    'height' => $arr_height[$i],
                ]
                );
            
            // test::create([
            //     'userName' => 'admin',
            //     'photoName' => $this->param,
            //     'label_id' => $i+1,
            //     'x' => $arr_x[$i],
            //     'y' => $arr_y[$i],
            //     'width' => $arr_width[$i],
            //     'height' => $arr_height[$i],
            // ]);

            

            Image::where('id', $this->param)->update(['is_ready' => 1]);
            // dd(Image::where('id', $this->param));
        }

        $this->dispatchBrowserEvent('page_refresh_prevent');
    }


    public function mount($param )
    {
        $this->param = $param;
        
        // $img_id = Image::find($id);
        // return view('livewire.l-selector', compact('img_id'))->extends('layouts.app');

    }

    public function render()
    {

        // $this->nav_images = Image::where('id', '<', $this->param)->orderByDesc('id')->limit(2)->get();
        // array_push($this->nav_images, Image::where('id', '<', $this->param)->orderByDesc('id')->limit(2)->get());
        $this->images = Image::find($this->param);
        $this->squares = test::where('photoName', $this->param)->get();

        foreach (Image::where('id', '<', $this->param)->orderByDesc('id')->limit(2)->get() as $q) {
            array_push($this->nav_images, $q);
        }
        array_push($this->nav_images, $this->images);
        foreach (Image::where('id', '>', $this->param)->orderBy('id')->limit(2)->get() as $q) {
            array_push($this->nav_images, $q);
        }
        
        return view('livewire.l-selector')->extends('layouts.app');
    }
}
