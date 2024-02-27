<?php

use App\Http\Controllers\Auth\RoleController;
use App\Http\Controllers\Auth\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->controller(UserController::class)->prefix('user')->group(function () {
    Route::get('index', 'index');
    Route::post('store', 'store');
    Route::get('edit/{id}', 'edit');
    Route::get('view/{id}', 'view');
    Route::get('change-status/{id}/{status}', 'changeStatus');
    Route::get('restore/{id}', 'restore');
    Route::post('update/{id}', 'update');
    Route::get('create', 'create');
    Route::post('change-password', 'change_password');
    Route::post('change-image', 'changeUserImage');
    Route::post('change-user-password/{id}', 'changeUserPassword');
    Route::get('print/{id}', 'print');
    Route::get('check/{search}', 'check');
});

Route::controller(UserController::class)->prefix('user')->group(function () {
    Route::get('auth-user', 'authUser');
    Route::post('change-password', 'changePassword');
    Route::post('logout', 'logout');
});