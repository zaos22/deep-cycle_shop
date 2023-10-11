<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\MaterialController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});

// Route::get('/test', function () {
//     return view('welcome');
// });

Route::get('/dashboard', function () {
    return view('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/users', function () {
    return view('admin.users');
})->middleware(['auth', 'verified'])->name('users');

Route::get('/users-data', [UserController::class, 'allUsers'])->name('users-data');
Route::post('/new-user', [UserController::class, 'store'])->name('new-user');
Route::put('/edit-user/{idUser}', [UserController::class, 'update'])->name('edit-user');
Route::delete('/delete-user/{idUser}', [UserController::class, 'destroy'])->name('delete-user');

Route::get('/suppliers', function () {
    return view('admin.suppliers');
})->middleware(['auth', 'verified'])->name('suppliers');

Route::get('/suppliers-data/{search?}', [SupplierController::class, 'allSuppliers'])->name('suppliers-data');
Route::post('/new-supplier', [SupplierController::class, 'store'])->name('new-supplier');
Route::put('/edit-supplier/{idSupplier}/{idMaterial}', [SupplierController::class, 'update'])->name('edit-supplier');
Route::delete('/delete-supplier/{idSupplier}', [SupplierController::class, 'destroy'])->name('delete-supplier');

Route::get('/materials-data/{idSupplier}', [MaterialController::class, 'allMaterials'])->name('suppliers-data');
Route::post('/new-material', [MaterialController::class, 'store'])->name('new-material');
Route::put('/edit-material/{idMaterial}', [MaterialController::class, 'update'])->name('edit-material');
Route::delete('/delete-material/{idMaterial}', [MaterialController::class, 'destroy'])->name('delete-material');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
