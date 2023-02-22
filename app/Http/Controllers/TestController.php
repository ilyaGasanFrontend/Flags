<?php

namespace App\Http\Controllers;

use App\Models\test;
use Illuminate\Http\Request;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $test = test::all();
        $width = 0;
        return view('selector', compact('test', 'width'));

    }

    public function sumbit()
    {
        dump("created" . $this->x);
    
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $postsArr = [
            'username' => 'admin',
            'photoname' => 'test',
            'x' => 1024,
            'y' => 1024,
            'width' => 1024,
            'height' => 1024,
        ];

        test::create([
            'username' => 'admin',
            'photoname' => 'test',
            'x' => 1024,
            'y' => 1024,
            'width' => 1024,
            'height' => 1024,
        ]);

        dd('created');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $data = new test;

        // $data->x = $request->input('x');
        // $data->save();

        // return redirect()->to('\db');
        //
        // $this->validate($request, array(
        //     'x' => 
        // ));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\test  $test
     * @return \Illuminate\Http\Response
     */
    public function show(test $test)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\test  $test
     * @return \Illuminate\Http\Response
     */
    public function edit(test $test)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\test  $test
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, test $test)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\test  $test
     * @return \Illuminate\Http\Response
     */
    public function destroy(test $test)
    {
        //
    }
}
