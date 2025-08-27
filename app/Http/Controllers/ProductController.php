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
    // List products
    public function index()
    {
        $user = Auth::user();

        $products = Product::with('subcategory.category')
            ->whereHas('subcategory', function ($q) use ($user) {
                $q->whereHas('category', function ($q2) use ($user) {
                    $q2->where('organization_id', $user->organization_id);
                });
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    // Show create form
    public function create()
    {
        $user = Auth::user();

        $categories = Category::with('subcategories')
            ->where('organization_id', $user->organization_id)
            ->get();

        return Inertia::render('Products/ProductForm', [
            'categories' => $categories,
        ]);
    }

    // Fetch subcategories dynamically (AJAX)
    public function getSubcategories(Category $category)
    {
        return response()->json($category->subcategories);
    }

    // Store product
    public function store(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'subcategory_id' => 'required|exists:sub_categories,id',
            'selling_price' => 'required|numeric',
            'buying_price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);

        $subcategory = Subcategory::with('category')->findOrFail($request->subcategory_id);

        if ($subcategory->category->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized: Subcategory does not belong to your organization.');
        }

        Product::create($request->only(['name','description','subcategory_id','selling_price','buying_price','quantity']));

        return redirect()->route('products.index')->with('success', 'Product created!');
    }

    // Show edit form
    public function edit(Product $product)
    {
        $user = Auth::user();
        $product->load('subcategory.category');

        if ($product->subcategory->category->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        $categories = Category::with('subcategories')
            ->where('organization_id', $user->organization_id)
            ->get();

        return Inertia::render('Products/ProductForm', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    // Update product
    public function update(Request $request, Product $product)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'subcategory_id' => 'required|exists:sub_categories,id',
            'selling_price' => 'required|numeric',
            'buying_price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);

        $subcategory = Subcategory::with('category')->findOrFail($request->subcategory_id);

        if ($subcategory->category->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        $product->update($request->only(['name','description','subcategory_id','selling_price','buying_price','quantity']));

        return redirect()->route('products.index')->with('success', 'Product updated!');
    }

    // Delete product
    public function destroy(Product $product)
    {
        $user = Auth::user();
        $product->load('subcategory.category');

        if ($product->subcategory->category->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted!');
    }
}
