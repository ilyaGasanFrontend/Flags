<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\WithPagination;

use App\Models\Image;
use App\Models\test;
use App\Models\Category;

use Illuminate\Support\Facades\Storage;

class Gallery extends Component
{
    use WithFileUploads;
    use WithPagination;

    protected $paginationTheme = 'bootstrap';

    public $gal;

    public $files = [];

    public $images;
    public $col_md = 3;
    public $filter = true;
    public $is_image = false;

    protected $listeners = ['AddFiles' => '$refresh'];

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
            // dd(public_path('storage/photos/' . auth()->user()->id . '/' .$image->hash_name));
            $zip->addFile(public_path('storage/photos/' . auth()->user()->name . '/' .$image->hash_name), $filename . '/' . 'images/train/' . $image->hash_name);
        }


        $zip->close();
        return response()->download($zip_file);
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

    public function mount($gal)
    {
        $this->gal = $gal;
        $this->emit('set_project_id', $gal);
    }

    public function render()
    {
        if ($this->filter) {
            $this->images = Image::where('is_ready', 0)->where('project_id', $this->gal)->get();
            // $paginate = Image::where('is_ready', 0)->where('user_id', auth()->user()->id)->cursorPaginate(2);
            $paginate = Image::where('is_ready', 0)->where('project_id', $this->gal)->paginate(12);
        } else {
            $this->images = Image::all()->where('project_id', $this->gal);
            // $paginate = Image::all()->where('user_id', auth()->user()->id)->cursorPaginate(2);
            $paginate = Image::where('project_id', $this->gal)->paginate(12);
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
