<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home and Dashboard
Route::get('/', fn() => Inertia::render('Home'));
Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->middleware(['auth', 'verified'])->name('dashboard');

// API Routes
Route::get('/api/roles', [RoleController::class, 'getroles']);

Route::middleware('auth')->group(function () {

    // Profile Routes
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Organization Routes
    Route::prefix('organization')->group(function () {
        Route::get('/create', [OrganizationController::class, 'form'])->name('organizations.create');
        Route::post('/', [OrganizationController::class, 'store'])->name('organizations.store');
        Route::get('/edit', [OrganizationController::class, 'form'])->name('organizations.edit');
        Route::put('/', [OrganizationController::class, 'update'])->name('organizations.update');
        Route::delete('/destroy', [OrganizationController::class, 'destroy'])
            ->name('organizations.destroy');
    });

    Route::resource('roles',RoleController::class);

    // Categories & Subcategories
    Route::resource('categories', CategoryController::class);
    Route::resource('subcategories', SubcategoryController::class);
    Route::get('/categories/{category}/subcategories', [ProductController::class, 'getSubcategories']);

    // Products
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('products.index');
        Route::get('/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/', [ProductController::class, 'store'])->name('products.store');
        Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    });

    // Suppliers & Purchases
    Route::resources([
        'suppliers' => SupplierController::class,
        'purchases' => PurchaseController::class,
        'customers' => CustomerController::class,
        'sales' => SaleController::class,
    ]);
});

require __DIR__ . '/auth.php';
