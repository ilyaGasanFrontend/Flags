<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\test;
use App\Models\Image;
use App\Models\Category;
use Auth;

class LSelector extends Component
{
    public $test;
    protected $listeners = ['submit', ];

    public $radio_category;
    public $img_scale;
    public $this_img_number;
    public $images_count;
    public $x;
    public $y;
    public $width;
    public $height;
    public $category;

    public $param; //передача id фотки во вьюху

    public $images; //массив данных из таблицы images

    public $nav_images = []; //фотографии в панель навигации
    // public $squares;

    public $delete;
    // protected $rules = [
    //     'x' => 'required',
    // ];

    private function next()
    {
        $last_img = Image::orderByDesc('id')->first();

        if ($this->images->id == $last_img->id) {
            $next_id = Image::first();
        } else {
            $next_id = Image::where('id', '>', $this->param)->first();
        }

        return redirect()->to('/gallery/' . $next_id->id . '/');
    }

    private function previous()
    {
        $first_img = Image::orderBy('id')->first();
        // dd($first_img->id);
        // $prev_id = Image::where('id', '<', $this->param)->orderByDesc('id')->first();
        if ($this->images->id == $first_img->id) {
            $prev_id = Image::orderByDesc('id')->first();
        } else {
            $prev_id = Image::where('id', '<', $this->param)->orderByDesc('id')->first();
        }

        return redirect()->to('/gallery/' . $prev_id->id . '/');
    }
    public function delete_row()
    {
        $arr_delete = explode(',', $this->delete);
        if (($arr_delete[0] != '')) {
            if (Image::find($this->param)->getOriginal('is_ready') == true) {
                foreach ($arr_delete as $id) {
                    Test::where('photoName', $this->param)->where('label_id', $id + 1)->delete();

                    $count = Test::where('photoName', $this->param)->where('label_id', '>', $id + 1)->count();

                    for ($i = $id + 1; $i <= $id + 1 + $count; $i++) {
                        Test::where('photoName', $this->param)->where('label_id', $i)->update(['label_id' => $i - 1]);
                    }
                }
            }
        }
        $this->dispatchBrowserEvent('page_refresh_prevent');
    }

    public function delete($id)
    {
        Test::where('photoName', $this->param)->where('label_id', $id + 1)->delete();

        $count = Test::where('photoName', $this->param)->where('label_id', '>', $id + 1)->count();

        for ($i = $id + 1; $i <= $id + 1 + $count; $i++) {
            Test::where('photoName', $this->param)->where('label_id', $i)->update(['label_id' => $i - 1]);
        }

        if (Test::where('user_id', auth()->user()->id)->where('photoName', $this->param)->count() == 0) {
            Image::where('id', $this->param)->update(['is_ready' => 0]);
        }
        // $this->dispatchBrowserEvent('page_refresh_prevent');
    }

    // public function foo($category, $x, $y, $width, $height)
    // {
    //     Test::create([
    //         'user_id' => auth()->user()->id,
    //         'photoName' => $this->param,
    //         'label_id' => Test::where('photoName', $this->param)->where('user_id', auth()->user()->id)->count() + 1,
    //         'category_id' => $category,
    //         'x' => $x,
    //         'y' => $y,
    //         'width' => $width,
    //         'height' => $height,
    //     ]);
    // }
    public function update($flag, $id, $x, $y, $width, $height, $category)
    {
        if ($flag == true)
        {
            Test::where('photoName', $this->param)->where('label_id', $id)->update(
                [
                    'category_id' => $category,
                    'x' => $x,
                    'y' => $y,
                    'width' => $width,
                    'height' => $height,
                ]
                );
        }
        

        // test::updateOrCreate(
        //     ['photoName' => $this->param, 'label_id' => $i + 1],
        //     [
        //         'user_id' => auth()->user()->id,
        //         'category_id' => $this->category[$i],
        //         'x' => $arr_x[$i],
        //         'y' => $arr_y[$i],
        //         'width' => $arr_width[$i],
        //         'height' => $arr_height[$i],
        //     ]
        // );
    }

    public function create($id, $category, $x, $y, $width, $height)
    {
        test::create([
            'user_id' => auth()->user()->id,
            'photoName' => $this->param,
            'label_id' => $id,
            'category_id' => $category,
            'x' => $x,
            'y' => $y,
            'width' => $width,
            'height' => $height,
        ]);

        Image::where('id', $this->param)->update(['is_ready' => 1]);
        
    }
    public function submit($param)
    {

        $arr_x = explode('px,', substr($this->x, 0, -2));
        $arr_y = explode('px,', substr($this->y, 0, -2));
        $arr_width = explode('px,', substr($this->width, 0, -2));
        $arr_height = explode('px,', substr($this->height, 0, -2));
        $arr_delete = explode(',', $this->delete);
        $this->category = explode(',', $this->category);

        if (($arr_delete[0] != '')) {
            if (Image::find($this->param)->getOriginal('is_ready') == true) {
                foreach ($arr_delete as $id) {

                    Test::where('photoName', $this->param)->where('label_id', $id + 1)->delete();

                    $count = Test::where('photoName', $this->param)->where('label_id', '>', $id + 1)->count();

                    for ($i = $id + 1; $i <= $id + 1 + $count; $i++) {
                        Test::where('photoName', $this->param)->where('label_id', $i)->update(['label_id' => $i - 1]);
                    }
                }
            }
        }

        if ($arr_x[0] != '') {
            for ($i = 0; $i < count($arr_x); $i++) {
                test::updateOrCreate(
                    ['photoName' => $this->param, 'label_id' => $i + 1],
                    [
                        'user_id' => auth()->user()->id,
                        'category_id' => $this->category[$i],
                        'x' => $arr_x[$i],
                        'y' => $arr_y[$i],
                        'width' => $arr_width[$i],
                        'height' => $arr_height[$i],
                    ]
                );

                Image::where('id', $this->param)->update(['is_ready' => 1]);
            }
        }

        // dd($arr_delete);
        $this->dispatchBrowserEvent('page_refresh_prevent');
        // dd($param == 'next');
        if ($param == 'next') {
            $this->next();
        } else if ($param == 'previous') {
            $this->previous();
        } else redirect()->to('/gallery/' . $param . '/');
    }


    public function mount($param)
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
        $squares = test::select(
            'tests.x',
            'tests.y',
            'tests.width',
            'tests.height',
            'categories.description',
            'categories.color',
            'tests.category_id', //для инпут хидден

        )->join(
            'categories',
            'tests.category_id',
            '=',
            'categories.id'
        )->where('photoName', $this->param)->where('tests.user_id', auth()->user()->id)->orderBy('label_id')->get();

        // dd($squares);
        // $this->squares = test::where('photoName', $this->param)->get();

        $this->nav_images = [];
        foreach (Image::where('id', '<', $this->param)->orderByDesc('id')->limit(2)->get() as $q) {
            array_push($this->nav_images, $q);
        } //nav_images = [1, 0]

        if (count($this->nav_images) == 2) {
            [$this->nav_images[0], $this->nav_images[1]] = [$this->nav_images[1], $this->nav_images[0]];
        } //nav_images = [0,1]

        array_push($this->nav_images, $this->images); //nav_images = [0, 1, 2]
        foreach (Image::where('id', '>', $this->param)->orderBy('id')->limit(2)->get() as $q) {
            array_push($this->nav_images, $q);
        } //nav_images = [0, 1, 2, 3, 4]

        $this->this_img_number = Image::where('id', '<=', $this->param)->count();
        $this->images_count = Image::count();

        $categories = Category::where('user_id', '=', auth()->user()->id)->get();
        // $this->radio_category = Category::first()->id;

        return view('livewire.l-selector', compact([
            'categories',
            'squares',
        ]))->extends('layouts.app');
    }
}
