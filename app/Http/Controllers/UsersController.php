<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $users = User::orderBy('id', 'DESC')->get();

        return view('users.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $roles = Role::orderBy('name', 'DESC')->get();

        return view('users.add-user', compact([
            'roles'
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
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'role' => 'required|integer|exists:roles,id',
            ],
            [
                'required' => ':attribute обязательно для заполнения',
                'integer' => ':attribute должно быть целым числом',
                'confirmed' => ':attribute не совпадают',
            ],
            [
                'name' => 'Имя',
                'email' => 'E-mail',
                'password' => 'Пароль',
                'role' => 'Роль',
            ]
        );

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);

        return redirect()->back()->with('status', 'Пользователь добавлен');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $roles = Role::orderBy('name', 'DESC')->get();

        return view('users.edit', compact([
            'roles',
            'user'
        ]));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        // dd($user->id);
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'password' => ['nullable', 'string', 'min:8'],
            'role' => 'required|integer|exists:roles,id',
            // 'password' => 'nullable',
        ]);

        // if($request->password != null & $request->password === ''){
        //     // $pass = Hash::make($request->password);
        //     $request->remove('password');
        // }
        if(empty($request->password)){
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                // 'password' => $request->password,  
            ]);
        }else{
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),  
            ]);
            // $request->password = Hash::make($request->password);
        }

        

        $role = Role::find($request->role);
        // dd($role->name);
        $user->syncRoles($role->name);

        return redirect()->back()->with('status', 'Пользователь обновлен');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        // dd($user->id);
        User::destroy($user->id);

        return redirect()->route('users')->with('status', 'Пользователь удален');
    }
}
