<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('categories.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::orderBy('description')->get();

        return view('categories.add-category', compact([
            'categories'
        ]));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => ['required', 'string', 'max:255'],
                // 'color' => ['required'],
            ],
            [
                'required' => ':attribute обязательно для заполнения',
            ],
            [
                'name' => 'Имя',
                // 'color' => 'Цвет',
            ]
        );

        $category = Category::create([
            'description' => $request->name,
            'color' => $request->color,
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->back()->with('status', 'Категория добавлена');
    }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  \App\Models\User  $user
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show(User $user)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        // $roles = Role::orderBy('name', 'DESC')->get();

        return view('categories.edit', compact([
            'category',
        ]));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        // if($request->password != null & $request->password === ''){
        //     // $pass = Hash::make($request->password);
        //     $request->remove('password');
        // }

        $category->update([
            'description' => $request->name,
            'color' => $request->color,
            // 'password' => $request->password,  
        ]);

        return redirect()->back()->with('status', 'Категория обновлена');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        // dd($user->id);
        Category::destroy($category->id);

        return redirect()->route('categories')->with('status', 'Категория удалена');
    }
}
