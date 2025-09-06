<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleController extends Controller
{
    // List all sales with items
    public function index()
    {
        $sales = Sale::with(['customer', 'items.product'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Sales/Index', compact('sales'));
    }

    // Show create form
    public function create()
    {
        $customers = Customer::all();
        $products = Product::all();
        return Inertia::render('Sales/Create', compact('customers', 'products'));
    }

    // Store sale
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sale_date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.sale_price' => 'required|numeric|min:0',
            'items.*.remain_amount' => 'required|numeric|min:0',
            'items.*.payment_status' => 'required|string',
            'items.*.paid_amount' => 'required|numeric|min:0',
        ]);

        DB::transaction(function() use ($request) {
            $sale = Sale::create([
                'organization_id' => 1, // Adjust according to auth user
                'customer_id' => $request->customer_id,
                'invoice_number' => 'INV-' . now()->timestamp,
                'sale_date' => $request->sale_date,
                'total_amount' => array_sum(array_map(fn($i) => $i['quantity'] * $i['sale_price'], $request->items)),
                'remain_amount' => array_sum(array_map(fn($i) => $i['remain_amount'], $request->items)),
                'payment_status' => $request->payment_status,
            ]);

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($item['quantity'] > $product->quantity) {
                    throw new \Exception("Not enough quantity for product: {$product->name}");
                }

                // Reduce quantity and update latest selling price
                $product->quantity -= $item['quantity'];
                $product->selling_price = $item['sale_price'];
                $product->save();

                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'sale_price' => $item['sale_price'],
                    'remain_amount' => $item['remain_amount'],
                    'paid_amount' => $item['paid_amount'],
                    'payment_status' => $item['payment_status'],
                ]);
            }
        });

        return redirect()->route('sales.index')->with('success', 'Sale created successfully!');
    }

    // Show edit form
    public function edit(Sale $sale)
    {
        $sale->load('items.product', 'customer');
        $customers = Customer::all();
        $products = Product::all();
        return Inertia::render('Sales/Edit', compact('sale', 'customers', 'products'));
    }

    // Update sale
    public function update(Request $request, Sale $sale)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sale_date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.sale_price' => 'required|numeric|min:0',
            'items.*.remain_amount' => 'required|numeric|min:0',
            'items.*.payment_status' => 'required|string',
            'items.*.paid_amount' => 'required|numeric|min:0',
        ]);

        DB::transaction(function() use ($request, $sale) {
            // Restore old product quantities
            foreach ($sale->items as $oldItem) {
                $product = Product::findOrFail($oldItem->product_id);
                $product->quantity += $oldItem->quantity;
                $product->save();
            }

            // Delete old items
            $sale->items()->delete();

            // Update sale
            $sale->update([
                'customer_id' => $request->customer_id,
                'sale_date' => $request->sale_date,
                'total_amount' => array_sum(array_map(fn($i) => $i['quantity'] * $i['sale_price'], $request->items)),
                'remain_amount' => array_sum(array_map(fn($i) => $i['remain_amount'], $request->items)),
                'payment_status' => $request->payment_status,
            ]);

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($item['quantity'] > $product->quantity) {
                    throw new \Exception("Not enough quantity for product: {$product->name}");
                }

                // Reduce quantity and update latest selling price
                $product->quantity -= $item['quantity'];
                $product->selling_price = $item['sale_price'];
                $product->save();

                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'sale_price' => $item['sale_price'],
                    'remain_amount' => $item['remain_amount'],
                    'paid_amount' => $item['paid_amount'],
                    'payment_status' => $item['payment_status'],
                ]);
            }
        });

        return redirect()->route('sales.index')->with('success', 'Sale updated successfully!');
    }

    // Delete sale
    public function destroy(Sale $sale)
    {
        DB::transaction(function() use ($sale) {
            foreach ($sale->items as $item) {
                $product = Product::findOrFail($item->product_id);
                $product->quantity += $item->quantity;
                $product->save();
            }

            $sale->delete();
        });

        return redirect()->route('sales.index')->with('success', 'Sale deleted and quantities restored!');
    }
}
