<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $categories = Category::where('organization_id', $user->organization_id)
            ->latest()
            ->paginate(10);

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
        $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'required|string',
        ]);

        $user = Auth::user();

        Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'organization_id' => $user->organization_id, // link to user's org
        ]);

        return redirect()->route('categories.index')->with('success', 'Category created!');
    }

    public function edit(Category $category)
    {
        // Ensure user can only edit categories from their organization
        $this->authorizeCategory($category);

        return Inertia::render('Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $this->authorizeCategory($category);

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
        $this->authorizeCategory($category);

        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted!');
    }

    private function authorizeCategory(Category $category)
    {
        if ($category->organization_id !== Auth::user()->organization_id) {
            abort(403, 'Unauthorized action.');
        }
    }
}
