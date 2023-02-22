<?php


use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UsersController;


use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/selector', 'App\Http\Controllers\TestController@index');
Route::get('/selector/create', 'App\Http\Controllers\TestController@create');
Route::get('/selector2', 'App\Http\Controllers\SelectorController@index');

// Route::livewire('db', 'selector'); 
Route::get('/db', \App\Http\Livewire\Test\Selector::class); 
Route::post('/articles/create', [App\Http\Controllers\TestController::class, 'submit']);

Route::get('/', function () {
    return view('auth.login');
});

Route::get('/', function () {
    return view('dashboard');
})->middleware(['auth']);

Route::middleware(['auth'])->group(function () {

    // Route::get('/dashboard', function () {
    //     return view('dashboard');
    // })->name('dashboard');

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // route root
    // route role
    Route::resource('role', RoleController::class)->middleware(['role:root']);
    
    // users
    Route::controller(UsersController::class)->middleware(['role:root'])->group(function(){
        Route::get('/users', 'index')->name('users');
        Route::get('/add-user', 'create')->name('add-user');
        Route::post('/store-user', 'store')->name('store-user');
        Route::get('/edit-user/{user}', 'edit')->name('edit-user');
        Route::put('/update-user/{user}', 'update')->name('update-user');
        // Route::delete('/delete-user/{user}', 'destroy')->name('delete-user');
    });
    
});

require __DIR__ . '/auth.php';
