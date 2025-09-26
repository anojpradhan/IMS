<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function getroles()
    {
        $roles = Role::latest()->get();
        return response()->json($roles);
    }

    public function index()
    {
        $roles = Role::latest()->get();
        return Inertia::render('Roles/index', ['roles' => $roles]);
    }

    public function create()
    {
        return Inertia::render('Roles/create');
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);

        if (!$user->organization_id) {
            return back()->withErrors(['organization' => 'You must belong to an organization to create a role.'])->withInput();
        }

        Role::create([
            'organization_id' => $user->organization_id,
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }


    public function edit(Role $role)
    {
        return Inertia::render('Roles/edit', ['role' => $role]);
    }

    public function update(Request $request, Role $role)
    {
        $this->authorizeRole($role);
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string'
        ]);


        $role->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('roles.index')->with('success', 'Role updated');
    }

    public function destroy(Role $role)
    {
        $this->authorizeRole($role);
        $role->delete();
        return redirect()->route('roles.index')->with('success', 'Role updated');
    }


    private function authorizeRole(Role $role)
    {
        if ($role->organization_id !== Auth::user()->organization_id) {
            abort(403, 'Unauthorized action.');
        }
    }
}
