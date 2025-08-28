<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the suppliers for the user's organization.
     */
    public function index()
    {
        $organizationId = Auth::user()->organization_id;

        $suppliers = Supplier::where('organization_id', $organizationId)
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
        $organizationId = Auth::user()->organization_id;

        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone'          => 'required|string|max:50',
            'email'          => 'required|email|max:255',
            'address'        => 'required|string',
        ]);

        $validated['organization_id'] = $organizationId;

        Supplier::create($validated);

        return redirect()->route('suppliers.index')->with('success', 'Supplier created successfully');
    }

    /**
     * Show the form for editing the specified supplier.
     */
    public function edit($id)
    {
        $organizationId = Auth::user()->organization_id;
        $supplier = Supplier::where('id', $id)
            ->where('organization_id', $organizationId)
            ->firstOrFail();

        return Inertia::render('Suppliers/Edit', [
            'supplier' => $supplier,
        ]);
    }

    /**
     * Update the specified supplier in storage.
     */
    public function update(Request $request, $id)
    {
        $organizationId = Auth::user()->organization_id;

        $supplier = Supplier::where('id', $id)
            ->where('organization_id', $organizationId)
            ->firstOrFail();

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
    public function destroy($id)
    {
        $organizationId = Auth::user()->organization_id;

        $supplier = Supplier::where('id', $id)
            ->where('organization_id', $organizationId)
            ->firstOrFail();

        $supplier->delete();

        return redirect()->route('suppliers.index')->with('success', 'Supplier deleted successfully');
    }
}
