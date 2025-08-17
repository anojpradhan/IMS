<?php

// use App\Http\Controllers\BackendController\CategoryController;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrganizationController;
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
});

require __DIR__.'/auth.php';
