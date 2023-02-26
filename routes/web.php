<?php


use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\TestController;
use App\Http\Livewire\LSelector;
use App\Http\Livewire\Gallery;

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
Route::get('/selector', [TestController::class, 'index']);
Route::post('/selector/create', [TestController::class, 'store']);
// Route::get('/selector2', 'SelectorController@Index');
Route::get('/db/{param}', LSelector::class); //возможно необходимо кодировать передаваемый параметр, чтобы пользователь не мог вручную перейти на не свою фотографию
Route::get('/gallery', Gallery::class);
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
