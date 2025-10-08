<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    // List products (scoped by org)
    public function index()
    {
        $user = Auth::user();

        $products = Product::with('subcategory.category')
            ->whereHas('subcategory.category', fn($q) => $q->where('organization_id', $user->organization_id))
            ->latest()
            ->paginate(10);

        return Inertia::render('Products/Index', compact('products'));
    }

    // Show create form
    public function create()
    {
        $categories = $this->getOrgCategories();
        return Inertia::render('Products/ProductForm', compact('categories'));
    }

    public function getSubcategories(Category $category)
    {
        $this->authorizeCategory($category);
        return response()->json($category->subcategories);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'subcategory_id' => 'required|exists:subcategories,id',
        ]);

        $subcategory = Subcategory::with('category')->findOrFail($data['subcategory_id']);
        $this->authorizeCategory($subcategory->category);

        Product::create($data);

        return redirect()->route('products.index')->with('success', 'Product created!');
    }

    public function edit(Product $product)
    {
        $product->load('subcategory.category');
        $this->authorizeProduct($product);

        $categories = $this->getOrgCategories();

        return Inertia::render('Products/ProductForm', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product)
    {
        $product->load('subcategory.category');
        $this->authorizeProduct($product);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'subcategory_id' => 'required|exists:subcategories,id',
        ]);

        $subcategory = Subcategory::with('category')->findOrFail($data['subcategory_id']);
        $this->authorizeCategory($subcategory->category);

        $product->update($data);

        return redirect()->route('products.index')->with('success', 'Product updated!');
    }

    public function destroy(Product $product)
    {
        $product->load('subcategory.category');
        $this->authorizeProduct($product);

        // Set related sale_items inactive
        $product->salesItems()->update(['is_active' => false]);

        // Set related purchase_items inactive
        $product->purchaseItems()->update(['is_active' => false]);
        $product->delete();


        return redirect()->route('products.index')->with('success', 'Product deactivated and related items set inactive!');
    }

    // Ensure product belongs to user's org
    private function authorizeProduct(Product $product)
    {
        $user = Auth::user();
        if ($product->subcategory->category->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized action.');
        }
    }

    // Ensure category belongs to user's org
    private function authorizeCategory(Category $category)
    {
        $user = Auth::user();
        if ($category->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }
    }

    // Fetch categories with subcategories for the current user's org
    private function getOrgCategories()
    {
        $user = Auth::user();
        return Category::with('subcategories')
            ->where('organization_id', $user->organization_id)
            ->get();
    }
}
