<?php
use App\Http\Controllers\Auth\PermissionController;
use App\Http\Controllers\Auth\DepartmentController;
use App\Http\Controllers\Auth\RoleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Department, Role, Permissions Routes
|--------------------------------------------------------------------------
|
| Here is where you can register Department, Role, Permissions routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "Department, Role, Permissions" middleware group. Now create something great!
|
*/
Route::middleware('auth:sanctum')->controller(DepartmentController::class)->prefix('department')->group(function () {
    Route::get('index', 'index');
    Route::get('create', 'create');
    Route::post('store', 'store');
    Route::get('edit/{id}', 'edit');
    Route::post('update/{id}', 'update');
    Route::get('get-all-department-in-option', 'geAllDepartmentInOption');
});

Route::middleware('auth:sanctum')->controller(RoleController::class)->prefix('role')->group(function () {
    Route::get('index', 'index');
    Route::post('store', 'store');
    Route::get('edit/{id}', 'edit');
    Route::post('update', 'update');
    Route::get('get-systems', 'getSystem');
    Route::post('get-roles-by-system-id', 'getRolesBySystemId');
});

Route::middleware('auth:sanctum')->controller(PermissionController::class)->prefix('permission')->group(function () {
    Route::get('get-permission-by-system-id/{id}', 'getPermissionBySystemId');
});

?>