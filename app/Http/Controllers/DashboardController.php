<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Image;
use App\Models\Projects;
use App\Models\test;
use Illuminate\Http\Request;
use SebastianBergmann\CodeCoverage\Report\Xml\Project;

class DashboardController extends Controller
{
    public $projects;

    // $labels = test::select(
    //     'images.original_name',
    //     'tests.category_id',
    //     'tests.label_id',
    //     'tests.x',
    //     'tests.y',
    //     'tests.width',
    //     'tests.height',
    //     'images.original_width',
    //     'images.original_height'
    // )
    //     ->join('images', 'tests.photoName', '=', 'images.id')
    //     // ->join('categories', 'tests.category_id', '=', 'categories.id')
    //     ->where('tests.user_id', auth()->user()->id)
    //     ->where('images.original_name', $image->original_name)
    //     // ->orderBy('images.id')
    //     // ->orderBy('label_id')
    //     ->get();

    public function index()
    {
        // $clients = Client::orderBy('id', 'desc')->limit(5)->get();
        if (Projects::where('user_id', auth()->user()->id)->count() <= 3) {
            // $this->projects = Projects::select('id', 'name', 'description')->where('user_id', auth()->user()->id)->get();
            $this->projects = Projects::select('id', 'name', 'description')->where('user_id', auth()->user()->id)->orderByDesc('updated_at')->limit(3)->get();
        } else {
            // select p.id, p.name, p.description, (select COUNT(*) from images i2 WHERE i2.project_id = p.id) as total from projects p 

            $this->projects = Projects::select('id', 'name', 'description')->where('user_id', auth()->user()->id)
                ->orderByDesc('updated_at')
                ->limit(3)
                ->get();
        }


        // $recent = test::groupBy('updated_at')->orderByDesc('updated_at')->get();
        // dd($this->projects);

        return view('dashboard')->with('projects', $this->projects);
    }
}

// SELECT t.id, t.photoName, i.project_id, i.path_to_file, p.name  from tests t 
// inner join images as i on i.id = photoName 
// inner join projects as p on p.id = i.project_id  
// order by t.updated_at DESC limit 3