<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Projects;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public $test = 123;
    public $projects;
    
    public function index()
    {
        // $clients = Client::orderBy('id', 'desc')->limit(5)->get();
        $this->projects = Projects::select('id', 'name', 'description')->where('user_id', auth()->user()->id)->get();
        return view('dashboard')->with('projects', $this->projects);
    }

    public function submit(Request $request)
    {
        dd(123);
    }
}
