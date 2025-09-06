<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerController extends Controller
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
     * Display a listing of the customers for the user's organization.
     */
    public function index()
    {
        $customers = Customer::where('organization_id', Auth::user()->organization_id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
        ]);
    }

    /**
     * Show the form for creating a new customer.
     */
    public function create()
    {
        return Inertia::render('Customers/Create');
    }

    /**
     * Store a newly created customer in storage.
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

        Customer::create($validated);

        return redirect()->route('customers.index')->with('success', 'Customer created successfully');
    }

    /**
     * Show the form for editing the specified customer.
     */
    public function edit(Customer $customer)
    {
        $this->authorizeOrg($customer);

        return Inertia::render('Customers/Edit', [
            'customer' => $customer,
        ]);
    }

    /**
     * Update the specified customer in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        $this->authorizeOrg($customer);

        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone'          => 'required|string|max:50',
            'email'          => 'required|email|max:255',
            'address'        => 'required|string',
        ]);

        $customer->update($validated);

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully');
    }

    /**
     * Remove the specified customer from storage.
     */
    public function destroy(Customer $customer)
    {
        $this->authorizeOrg($customer);

        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully');
    }
}
