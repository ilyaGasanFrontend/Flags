<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Livewire\WithPagination;

use App\Models\test;
use App\Models\Image;
use App\Models\Category;

class LSelector extends Component
{
    use WithPagination;
    protected $paginationTheme = 'bootstrap';
    protected $querySrting = ['search'];

    private $DELAY = 0.5;
    public $test;
    protected $listeners = ['submit', 'create'];

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

    public $show_grid = false;

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
        sleep($this->DELAY);
    }

    public function testss($param, $param2, $param3, $param4, $param5) {
        dd($param, $param2, $param3, $param4, $param5);
    }

    public function update($flag, $id, $x, $y, $width, $height, $category)
    {
        // dd('123');
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
    }

    public function create($id, $category, $x, $y, $width, $height)
    {
        $sql = test::create([
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
        // !!!!!!!!!!!!!!!!!! можно попробовать сделать через ?провайдер 
        // 
        //https://laravel.com/docs/10.x/database#listening-for-query-events  
        $this->dispatchBrowserEvent('RecordCreated');
        sleep($this->DELAY);
    }

    public function go_to_prev()
    {
        $prev_id = Image::where('user_id', auth()->user()->id)->where('id', '<', $this->param)->orderByDesc('id')->limit(1)->value('id');
        $this->param = $prev_id;
        $this->images = Image::find($this->param);
        $this->dispatchBrowserEvent('prevPageClicked');
    }

    public function go_to_next()
    {
        $next_id = Image::where('user_id', auth()->user()->id)->where('id', '>', $this->param)->limit(1)->value('id');
        if ($next_id == null)
        {
            $next_id = Image::where('user_id', auth()->user()->id)->first()->value('id');
            // dd($next_id);
        }

        $this->param = $next_id;
        $this->images = Image::find($this->param);
        $this->dispatchBrowserEvent('nextPageClicked');
    }


    public function mount($param)
    {
        $this->param = $param;
    }

    public function render()
    {
        $first_id = Image::where('user_id', auth()->user()->id)->first()->value('id');
        $last_id = Image::where('user_id', auth()->user()->id)->orderByDesc('id')->value('id');
        // dd($this->first_id);

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

        if ($this->param == Image::where('user_id', auth()->user()->id)->first()->getOriginal('id')) {
            $prev_image_id = Image::where('user_id', auth()->user()->id)->orderByDesc('id')->first()->getOriginal('id');
        }
        else {
            $prev_image_id = Image::where('user_id', auth()->user()->id)->where('id', '<', $this->param)->orderByDesc('id')->first()->getOriginal('id');
        }

        if ($this->param == Image::where('user_id', auth()->user()->id)->orderByDesc('id')->first()->getOriginal('id')) {
            $next_image_id = Image::where('user_id', auth()->user()->id)->first()->getOriginal('id');
        }
        else {
            $next_image_id = Image::where('user_id', auth()->user()->id)->where('id', '>', $this->param)->first()->getOriginal('id');
        }

        $paginate = Image::find($this->param)->paginate(1);
        // dd($prev_image_id);
        // $next_image_id;
        return view('livewire.l-selector', compact([
            'categories',
            'squares',
            'prev_image_id',
            'next_image_id',
            'paginate',
            'first_id',
            'last_id',
            // 'foo' => Image::where('id', 'like', '%'.$this->param.'%')->get(),
        ]))->extends('layouts.app');
    }
}
