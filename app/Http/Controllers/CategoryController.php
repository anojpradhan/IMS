<?php

namespace App\Http\Controllers;

// use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->paginate(10);

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

public function store(Request $request)
{
    // dd($request);
    $request->validate([
        'name' => 'required|string|max:100',
        'description' => 'required|string',
    ]);
    
    Category::create([
        'name' => $request->name,
        'description' => $request->description,
        'created_at' => now(),
    ]);
    
    return redirect()->route('categories.index')->with('success', 'Category created!');
}


        
        public function edit(Category $category)
        {
            return Inertia::render('Categories/Edit', [
                'category' => $category,
            ]);
        }
        
        public function update(Request $request, Category $category)
        {
            $request->validate([
                'name' => 'required|string|max:100',
                'description' => 'required|string',
            ]);
        $category->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('categories.index')->with('success', 'Category updated!');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted!');
    }
}
