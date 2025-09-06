<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Purchase;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $purchases = Purchase::with('items.product', 'supplier')
            ->where('organization_id', $user->organization_id)
            ->orderBy('purchase_date', 'desc')
            ->get();

        return Inertia::render('Purchases/Index', compact('purchases'));
    }

    public function create()
    {
        $user = Auth::user();

        $suppliers = Supplier::where('organization_id', $user->organization_id)->get();
        $products  = Product::whereHas('subcategory.category', fn($q) => $q->where('organization_id', $user->organization_id))->get();

        return Inertia::render('Purchases/Create', compact('suppliers', 'products'));
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $this->validatePurchase($request);

        DB::transaction(function () use ($validated, $user, &$purchase) {
            $purchase = Purchase::create([
                'organization_id' => $user->organization_id,
                'supplier_id'     => $validated['supplier_id'],
                'invoice_number'  => $validated['invoice_number'],
                'purchase_date'   => $validated['purchase_date'],
                'total_amount'    => collect($validated['items'])->sum(fn($i) => $i['quantity'] * $i['purchase_price']),
                'payment_status'  => 'paid', // temporary
                'remain_amount'   => 0,      // temporary
            ]);

            [$purchaseStatus, $totalRemain] = $this->processPurchaseItems($purchase, $validated['items'], $user);

            $purchase->update(['payment_status' => $purchaseStatus, 'remain_amount' => $totalRemain]);
        });

        return redirect()->route('purchases.index')->with('success', 'Purchase created successfully.');
    }

    public function edit(Purchase $purchase)
    {
        $user = Auth::user();
        $this->authorizePurchase($purchase, $user);

        $purchase->load('items.product', 'supplier');

        $suppliers = Supplier::where('organization_id', $user->organization_id)->get();
        $products  = Product::whereHas('subcategory.category', fn($q) => $q->where('organization_id', $user->organization_id))->get();

        return Inertia::render('Purchases/Edit', [
            'purchase' => [
                ...$purchase->toArray(),
                'purchase_date' => $purchase->purchase_date->format('Y-m-d'),
            ],
            'suppliers' => $suppliers,
            'products' => $products,
        ]);
    }

    public function update(Request $request, Purchase $purchase)
    {
        $user = Auth::user();
        $this->authorizePurchase($purchase, $user);

        $validated = $this->validatePurchase($request);

        DB::transaction(function () use ($validated, $purchase, $user) {
            $this->revertOldStock($purchase, $user);
            $purchase->items()->delete();

            $purchase->update([
                'supplier_id'    => $validated['supplier_id'],
                'invoice_number' => $validated['invoice_number'],
                'purchase_date'  => $validated['purchase_date'],
                'total_amount'   => collect($validated['items'])->sum(fn($i) => $i['quantity'] * $i['purchase_price']),
                'payment_status' => 'paid', // temporary
                'remain_amount'  => 0,      // temporary
            ]);

            [$purchaseStatus, $totalRemain] = $this->processPurchaseItems($purchase, $validated['items'], $user);

            $purchase->update(['payment_status' => $purchaseStatus, 'remain_amount' => $totalRemain]);
        });

        return redirect()->route('purchases.index')->with('success', 'Purchase updated successfully.');
    }

    public function destroy(Purchase $purchase)
    {
        $user = Auth::user();
        $this->authorizePurchase($purchase, $user);

        DB::transaction(function () use ($purchase, $user) {
            $affectedProducts = $purchase->items->pluck('product_id')->unique();
            $purchase->items()->delete();
            $purchase->delete();

            foreach ($affectedProducts as $productId) {
                $this->recalculateProductStock($productId, $user);
            }
        });

        return redirect()->route('purchases.index')->with('success', 'Purchase deleted successfully.');
    }

    /* ------------------ Helper Methods ------------------ */

    private function validatePurchase(Request $request)
    {
        return $request->validate([
            'supplier_id'      => 'required|exists:suppliers,id',
            'invoice_number'   => 'required|string',
            'purchase_date'    => 'required|date',
            'items'            => 'required|array|min:1',
            'items.*.product_id'     => 'required|exists:products,id',
            'items.*.quantity'       => 'required|integer|min:1',
            'items.*.purchase_price' => 'required|numeric|min:0',
            'items.*.payment_status' => 'required|in:paid,unpaid,partial',
            'items.*.remain_amount'  => 'nullable|numeric|min:0',
        ]);
    }

    private function processPurchaseItems(Purchase $purchase, array $items, $user)
    {
        $purchaseStatus = 'paid';
        $totalRemain = 0;

        foreach ($items as $item) {
            $product = Product::with('subcategory.category')->findOrFail($item['product_id']);

            if ($product->subcategory->category->organization_id !== $user->organization_id) {
                abort(403, 'Unauthorized product.');
            }

            $remain = $item['payment_status'] === 'paid'
                ? 0
                : ($item['remain_amount'] ?? ($item['quantity'] * $item['purchase_price']));

            $purchase->items()->create([
                'product_id'     => $item['product_id'],
                'quantity'       => $item['quantity'],
                'purchase_price' => $item['purchase_price'],
                'payment_status' => $item['payment_status'],
                'remain_amount'  => $remain,
            ]);

            if ($item['payment_status'] !== 'paid') $purchaseStatus = 'partial';
            $totalRemain += $remain;

            $this->updateProductStock($product, $item['quantity'], $item['purchase_price']);
        }

        return [$purchaseStatus, $totalRemain];
    }

    private function updateProductStock(Product $product, int $qty, float $price)
    {
        $oldQty = $product->quantity ?? 0;
        $oldPrice = $product->buying_price ?? 0;
        $totalQty = $oldQty + $qty;

        $avgPrice = $totalQty > 0
            ? (($oldQty * $oldPrice) + ($qty * $price)) / $totalQty
            : $price;

        $product->update([
            'quantity' => $totalQty,
            'buying_price' => $avgPrice,
        ]);
    }

    private function revertOldStock(Purchase $purchase, $user)
    {
        foreach ($purchase->items as $item) {
            $product = Product::find($item->product_id);
            if ($product) {
                $product->quantity -= $item->quantity;
                if ($product->quantity < 0) $product->quantity = 0;
                $product->save();
            }
        }
    }

    private function recalculateProductStock(int $productId, $user)
    {
        $product = Product::find($productId);
        if (!$product) return;

        $remainingItems = DB::table('purchase_items')
            ->join('purchases', 'purchase_items.purchase_id', '=', 'purchases.id')
            ->where('purchase_items.product_id', $productId)
            ->where('purchases.organization_id', $user->organization_id)
            ->select('purchase_items.quantity', 'purchase_items.purchase_price')
            ->get();

        $totalQty = $remainingItems->sum('quantity');
        $totalCost = $remainingItems->sum(fn($item) => $item->quantity * $item->purchase_price);

        $avgPrice = $totalQty > 0 ? $totalCost / $totalQty : 0;

        $product->update([
            'quantity' => $totalQty,
            'buying_price' => $avgPrice,
        ]);
    }

    private function authorizePurchase(Purchase $purchase, $user)
    {
        if ($purchase->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized purchase.');
        }
    }
}
