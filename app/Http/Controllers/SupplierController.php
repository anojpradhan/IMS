<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Helper to authorize organization ownership.
     */
    private function authorizeOrg($model)
    {
        if ($model->organization_id !== Auth::user()->organization_id) {
            abort(403, 'Unauthorized action.');
        }
    }

    /**
     * Display a listing of the suppliers for the user's organization.
     */
    public function index()
    {
        $suppliers = Supplier::where('organization_id', Auth::user()->organization_id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Suppliers/Index', [
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Show the form for creating a new supplier.
     */
    public function create()
    {
        return Inertia::render('Suppliers/Create');
    }

    /**
     * Store a newly created supplier in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone'          => 'required|string|max:50',
            'email'          => 'required|email|max:255',
            'address'        => 'required|string',
        ]);

        $validated['organization_id'] = Auth::user()->organization_id;

        Supplier::create($validated);

        return redirect()->route('suppliers.index')->with('success', 'Supplier created successfully');
    }

    /**
     * Show the form for editing the specified supplier.
     */
    public function edit(Supplier $supplier)
    {
        $this->authorizeOrg($supplier);

        return Inertia::render('Suppliers/Edit', [
            'supplier' => $supplier,
        ]);
    }

    /**
     * Update the specified supplier in storage.
     */
    public function update(Request $request, Supplier $supplier)
    {
        $this->authorizeOrg($supplier);

        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone'          => 'required|string|max:50',
            'email'          => 'required|email|max:255',
            'address'        => 'required|string',
        ]);

        $supplier->update($validated);

        return redirect()->route('suppliers.index')->with('success', 'Supplier updated successfully');
    }

    /**
     * Remove the specified supplier from storage.
     */
    public function destroy(Supplier $supplier)
    {
        $this->authorizeOrg($supplier);

        $supplier->delete();

        return redirect()->route('suppliers.index')->with('success', 'Supplier deleted successfully');
    }
}
