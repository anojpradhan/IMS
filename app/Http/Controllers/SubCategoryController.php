<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubcategoryController extends Controller
{
    

    private function authorizeOrg(Subcategory $subcategory)
    {
        $orgId = Auth::user()->organization_id;

        if ($subcategory->category->organization_id !== $orgId) {
            abort(403, 'Unauthorized action.');
        }
    }

    public function index()
    {
        $orgId = Auth::user()->organization_id;

        // Fetch subcategories whose category belongs to the user's org
        $subcategories = Subcategory::with('category')
            ->whereHas('category', function ($query) use ($orgId) {
                $query->where('organization_id', $orgId);
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Subcategories/Index', [
            'subcategories' => $subcategories,
        ]);
    }

    public function create()
    {
        $orgId = Auth::user()->organization_id;

        // Only fetch categories belonging to the user's org
        $categories = Category::where('organization_id', $orgId)->get();

        return Inertia::render('Subcategories/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $orgId = Auth::user()->organization_id;

        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:100',
        ]);

        // Ensure category belongs to the current org
        $category = Category::findOrFail($request->category_id);
        if ($category->organization_id !== $orgId) {
            abort(403, 'Unauthorized action.');
        }

        Subcategory::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
        ]);

        return redirect()->route('subcategories.index')->with('success', 'Subcategory created!');
    }

    public function edit(Subcategory $subcategory)
    {
        $this->authorizeOrg($subcategory);

        $orgId = Auth::user()->organization_id;
        $categories = Category::where('organization_id', $orgId)->get();

        return Inertia::render('Subcategories/Edit', [
            'subcategory' => $subcategory,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Subcategory $subcategory)
    {
        $this->authorizeOrg($subcategory);

        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:100',
        ]);

        // Ensure the new category belongs to the same org
        $category = Category::findOrFail($request->category_id);
        if ($category->organization_id !== Auth::user()->organization_id) {
            abort(403, 'Unauthorized action.');
        }

        $subcategory->update([
            'category_id' => $request->category_id,
            'name' => $request->name,
        ]);

        return redirect()->route('subcategories.index')->with('success', 'Subcategory updated!');
    }

    public function destroy(Subcategory $subcategory)
    {
        $this->authorizeOrg($subcategory);

        $subcategory->delete();

        return redirect()->route('subcategories.index')->with('success', 'Subcategory deleted!');
    }
}
