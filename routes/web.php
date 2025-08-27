<?php

// use App\Http\Controllers\BackendController\CategoryController;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SubcategoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render(('Home'));
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');





Route::get('/api/roles',[RoleController::class, 'getroles']);
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


// Organizations  
        Route::get('/organization/create', [OrganizationController::class, 'form'])
        ->name('organizations.create');
        Route::post('/organization', [OrganizationController::class, 'store'])
        ->name('organizations.store');
        Route::get('/organization/edit', [OrganizationController::class, 'form'])
        ->name('organizations.edit');
        Route::put('/organization', [OrganizationController::class, 'update'])
        ->name('organizations.update');
        
        Route::resource('categories', CategoryController::class);
        Route::resource('subcategories', SubcategoryController::class);

    // Route for fetching subcategories of a category
    Route::get('/categories/{category}/subcategories', [ProductController::class, 'getSubcategories']);


            Route::get('/products', [ProductController::class, 'index'])
        ->name('products.index');

    // Show form to create a new product
    Route::get('/products/create', [ProductController::class, 'create']) // can reuse edit form if desired
        ->name('products.create');

    // Store a new product
    Route::post('/products', [ProductController::class, 'store'])
        ->name('products.store');

    // Show form to edit existing product
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])
        ->name('products.edit');

    // Update existing product
    Route::put('/products/{product}', [ProductController::class, 'update'])
        ->name('products.update');

    // Delete product
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])
        ->name('products.destroy');

});

require __DIR__.'/auth.php';
