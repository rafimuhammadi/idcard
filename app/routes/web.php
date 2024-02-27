<?php

use App\Http\Controllers\ACU\AreaController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  return view('auth.login');
});


Route::get('/print/{id}', [App\Http\Controllers\Auth\UserController::class, 'print'])->name('print');


Illuminate\Support\Facades\Auth::routes();
Route::middleware('auth')->group(function () {
  Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

  // language management routes
  require('lang_routes.php');

});