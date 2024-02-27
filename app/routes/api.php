<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\DirectorateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->controller(AuthController::class)->group(function () {
    Route::post('verify_user', 'verify_user');
});

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    require('user_routes.php');
    require('administration.php');
});

Route::middleware('auth:sanctum')->post('/refresh_token', function (Request $request) {
    $user = $request->user();
    $token = $user->createToken('api_token')->plainTextToken;
    return response()->json([
        'refresh_token' => $token,
        'token_type' => 'Bearer',
        'expires_at' => now()->addMinutes(60), // Adjust expiration time
    ]);
});