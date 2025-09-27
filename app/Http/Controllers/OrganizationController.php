<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrganizationController extends Controller
{

    

    public function form()
    {
        $user = Auth::user();
        $organization = $user->organization ?? null;

        return Inertia::render('Organizations/Form', [
            'organization' => $organization,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        $user = Auth::user();

        $organization = Organization::create([
            'name'       => $request->name,
            'address'    => $request->address,
            'phone'      => $request->phone,
            'email'      => $request->email,
            'created_by' => $user->id,
        ]);

        $user->organization_id = $organization->id;
        $user->role_id = 1; // admin
        $user->save();

        return redirect()->route('dashboard')->with('success', 'Organization created successfully! 🚀');
    }


    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        $user = Auth::user();
        $organization = $user->organization;

        if (! $organization) {
            return redirect()->route('organization.create');
        }

        $organization->update([
            'name'    => $request->name,
            'address' => $request->address,
            'phone'   => $request->phone,
            'email'   => $request->email,
        ]);

        return redirect()->route('dashboard')->with('success', 'Organization updated successfully! ✅');
    }

    public function destroy()
    {
        $user = Auth::user();
        $organization = $user->organization;

        if ($organization) {
            // Optionally, you might want to handle related users or data here
            $organization->delete();
            $user->organization_id = null;
            $user->role_id = null; // or set to a default role
            $user->save();
        }

        return redirect()->route('dashboard')->with('success', 'Organization deleted successfully! 🗑️');
    }
}
