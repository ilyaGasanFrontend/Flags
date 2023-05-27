<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\TestController;
use App\Http\Livewire\LSelector;
use App\Http\Livewire\Gallery;
use App\Http\Livewire\OptionsIndex;
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

// Route::get('/gallery/{param}', LSelector::class); //возможно необходимо кодировать передаваемый параметр, чтобы пользователь не мог вручную перейти на не свою фотографию
// Route::get('/gallery', Gallery::class);

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

    //gallery & selector
    Route::get('/gallery', Gallery::class)->name('gallery');
    Route::get('/gallery/{param}', LSelector::class); //возможно необходимо кодировать передаваемый параметр, чтобы пользователь не мог вручную перейти на не свою фотографию
    Route::get('/gallery/flags', LSelector::class);
    // Route::get('/options', OptionsIndex::class)->name('options');


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
    
    Route::controller(CategoryController::class)->group(function() {
        Route::get('/categories', 'index')->name('categories');
        Route::get('/add-category', 'create')->name('add-category');
        Route::post('/store-category', 'store')->name('store-category');
        Route::get('/edit-category/{category}', 'edit')->name('edit-category');
        Route::put('/update-category/{category}', 'update')->name('update-category');
    });
});

require __DIR__ . '/auth.php';
