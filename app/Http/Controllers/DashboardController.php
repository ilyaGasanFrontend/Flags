<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // $clients = Client::orderBy('id', 'desc')->limit(5)->get();

        return view('dashboard');
    }
}
