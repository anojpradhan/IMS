<?php

namespace App\Http\Controllers;


use App\Models\Subcategory;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubcategoryController extends Controller
{
    public function index()
    {
        $subcategories = Subcategory::with('category')->latest()->paginate(10);

        return Inertia::render('Subcategories/Index', [
            'subcategories' => $subcategories,
        ]);
    }

    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Subcategories/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:100',
        ]);
        Subcategory::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
        ]);


        return redirect()->route('subcategories.index')->with('success', 'Subcategory created!');
    }


    public function edit(Subcategory $subcategory)
    {
        $categories = Category::all();

        return Inertia::render('Subcategories/Edit', [
            'subcategory' => $subcategory,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Subcategory $subcategory)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:100',
        ]);

        $subcategory->update([
            'category_id' => $request->category_id,
            'name' => $request->name,
        ]);

        return redirect()->route('subcategories.index')->with('success', 'Subcategory updated!');
    }

    public function destroy(Subcategory $subcategory)
    {
        $subcategory->delete();

        return redirect()->route('subcategories.index')->with('success', 'Subcategory deleted!');
    }
}