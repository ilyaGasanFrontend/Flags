<?php

namespace App\Http\Controllers;

use App\Models\test;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public $x;
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // $postsArr = [
        //     [
        //         'x' => 1024,
        //         'y' => 1024,
        //         'width' => 1024,
        //         'height' => 1024,
        //     ],
        //     [
        //         'x' => 1023,
        //         'y' => 1023,
        //         'width' => 1023,
        //         'height' => 1023,
        //     ]
        // ];

        test::create([
            'x' => 1024,
            'y' => 1024,
            'width' => 1024,
            'height' => 1024,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $test = new test;
        $test->x = $request->x;
        $test->y = $request->y;
        $test->width = $request->width;
        $test->height = $request->height;
        $test->save();
        return redirect('selector')->with('status', 'Blog Post Form Data Has Been inserted');

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
