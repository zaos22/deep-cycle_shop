<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MontageController;
use App\Models\Montage;
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

Route::get('/users-data/{search?}', [UserController::class, 'allUsers'])->name('users-data');
Route::post('/new-user', [UserController::class, 'store'])->name('new-user');
Route::put('/edit-user/{idUser}', [UserController::class, 'update'])->name('edit-user');
Route::delete('/delete-user/{idUser}', [UserController::class, 'destroy'])->name('delete-user');

Route::get('/suppliers', function () {
    return view('admin.suppliers');
})->middleware(['auth', 'verified'])->name('suppliers');

Route::get('/suppliers-data/{search?}', [SupplierController::class, 'allSuppliers'])->name('suppliers-data');
Route::post('/new-supplier', [SupplierController::class, 'store'])->name('new-supplier');
Route::put('/edit-supplier/{idSupplier}', [SupplierController::class, 'update'])->name('edit-supplier');
Route::delete('/delete-supplier/{idSupplier}', [SupplierController::class, 'destroy'])->name('delete-supplier');

Route::get('/materials-data/{idSupplier}/{search?}', [MaterialController::class, 'allMaterials'])->name('materials-data');
Route::get('/all-materials', [MaterialController::class, 'index'])->name('all-materials');
Route::post('/new-material', [MaterialController::class, 'store'])->name('new-material');
Route::put('/edit-material/{idMaterial}', [MaterialController::class, 'update'])->name('edit-material');
Route::delete('/delete-material/{idMaterial}', [MaterialController::class, 'destroy'])->name('delete-material');

Route::get('/products', function () {
    return view('admin.products');
})->middleware(['auth', 'verified'])->name('products');

Route::get('/products-data/{search?}', [ProductController::class, 'index'])->name('products-data');
Route::get('/moreinfo/{idProduct}', [ProductController::class, 'moreInfo'])->name('moreinfo');
Route::post('/new-product', [ProductController::class, 'store'])->name('new-product');
Route::post('/new-montage', [MontageController::class, 'store'])->name('new-montage');
Route::post('/add-materials', [MontageController::class, 'storeMaterials'])->name('add-materials');
Route::put('/edit-product/{idProduct}/{idMaterial}', [ProductController::class, 'update'])->name('edit-product');
Route::delete('/delete-product/{idProducts}', [ProductController::class, 'destroy'])->name('delete-product');
Route::delete('/del-montage/{montage}', [MontageController::class, 'destroy'])->name('del-montage');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
