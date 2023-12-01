<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MontageController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\BillLinesController;
use App\Models\Montage;
use App\Models\Product;
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
})->middleware(['auth', 'verified', 'role_verify'])->name('dashboard');

Route::get('/users', function () {
    return view('admin.users');
})->middleware(['auth', 'verified', 'role_verify'])->name('users');

Route::get('/users-data/{search?}', [UserController::class, 'allUsers'])->name('users-data')->middleware('role_verify');
Route::post('/new-user', [UserController::class, 'store'])->name('new-user')->middleware('role_verify');
Route::put('/edit-user/{idUser}', [UserController::class, 'update'])->name('edit-user')->middleware('role_verify');
Route::delete('/delete-user/{idUser}', [UserController::class, 'destroy'])->name('delete-user')->middleware('role_verify');

Route::get('/suppliers', function () {
    return view('admin.suppliers');
})->middleware(['auth', 'verified', 'role_verify'])->name('suppliers');

Route::get('/suppliers-data/{search?}', [SupplierController::class, 'allSuppliers'])->name('suppliers-data')->middleware('role_verify');
Route::post('/new-supplier', [SupplierController::class, 'store'])->name('new-supplier')->middleware('role_verify');
Route::put('/edit-supplier/{idSupplier}', [SupplierController::class, 'update'])->name('edit-supplier')->middleware('role_verify');
Route::delete('/delete-supplier/{idSupplier}', [SupplierController::class, 'destroy'])->name('delete-supplier')->middleware('role_verify');

Route::get('/materials-data/{idSupplier}/{search?}', [MaterialController::class, 'allMaterials'])->name('materials-data')->middleware('role_verify');
Route::get('/all-materials', [MaterialController::class, 'index'])->name('all-materials')->middleware('role_verify');
Route::post('/new-material', [MaterialController::class, 'store'])->name('new-material')->middleware('role_verify');
Route::post('/duplicate1-material/{idMaterial}', [MaterialController::class, 'duplicate1'])->name('duplicate1-material')->middleware('role_verify');
Route::post('/duplicate-material/{idMaterial}', [MaterialController::class, 'duplicate'])->name('duplicate-material')->middleware('role_verify');
Route::put('/edit-material/{idMaterial}', [MaterialController::class, 'update'])->name('edit-material')->middleware('role_verify');
Route::delete('/delete-material/{idMaterial}', [MaterialController::class, 'destroy'])->name('delete-material')->middleware('role_verify');
Route::delete('/used1-material/{idMaterial}', [MaterialController::class, 'used1'])->name('used1-material')->middleware('role_verify');
Route::delete('/used-material/{idMaterial}', [MaterialController::class, 'used'])->name('used-material')->middleware('role_verify');
Route::delete('/usedall-material/{idMaterial}', [MaterialController::class, 'usedAll'])->name('usedall-material')->middleware('role_verify');

Route::get('/products', function () {
    return view('admin.products');
})->middleware(['auth', 'verified', 'role_verify'])->name('products');

Route::get('/products-data/{search?}', [ProductController::class, 'index'])->name('products-data');
Route::get('/moreinfo/{idProduct}', [ProductController::class, 'moreInfo'])->name('moreinfo')->middleware('role_verify');
Route::post('/new-product', [ProductController::class, 'store'])->name('new-product')->middleware('role_verify');
Route::post('/duplicate1-product/{idProduct}', [ProductController::class, 'duplicate1'])->name('duplicate1-product')->middleware('role_verify');
Route::post('/duplicate-product/{idProduct}', [ProductController::class, 'duplicate'])->name('duplicate-product')->middleware('role_verify');
Route::post('/new-montage', [MontageController::class, 'store'])->name('new-montage')->middleware('role_verify');
Route::post('/add-materials', [ProductController::class, 'storeMaterials'])->name('add-materials')->middleware('role_verify');
Route::put('/edit-product/{idProduct}', [ProductController::class, 'update'])->name('edit-product')->middleware('role_verify');
Route::delete('/delete-product/{idProduct}/{idMontage}', [ProductController::class, 'destroy'])->name('delete-product')->middleware('role_verify');
Route::delete('/sell1-product/{idProduct}', [ProductController::class, 'sell1'])->name('sell1-product')->middleware('role_verify');
Route::delete('/sell-product/{idProduct}', [ProductController::class, 'sell'])->name('sell-product')->middleware('role_verify');
Route::delete('/soldout-product/{idProduct}', [ProductController::class, 'soldout'])->name('soldout-product')->middleware('role_verify');
Route::delete('/del-montage/{montage}', [MontageController::class, 'destroy'])->name('del-montage')->middleware('role_verify');

Route::get('/bills', function () {
    return view('admin.bills');
})->middleware(['auth', 'verified', 'role_verify'])->name('bills');

Route::get('/bills-data/{search?}', [BillController::class, 'index'])->name('bills-data')->middleware('role_verify');
Route::get('/bill_lines/{billID}/{search?}', [BillLinesController::class, 'index'])->name('bill_lines')->middleware('role_verify');

Route::get('/home', function () {
    return view('client.home');
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
