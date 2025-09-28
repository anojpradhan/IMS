<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrgUserController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $users = User::where('organization_id', $user->organization_id)->with('role')->get();
        return Inertia::render('Users/Index', ['users' => $users]);
    }

    public function addpage()
    {
        $roles = Role::all();
        $users = User::whereNull('organization_id')->get();
        return Inertia::render('Users/AddUser', [
            'roles' => $roles,
            'users' => $users,
        ]);
    }

    public function adduser(Request $request)
    {
        // dd("Hello ");
        $request->validate([
            'user_id' => 'required|integer',
            'role_id' => 'required|integer',
        ]);

        $authUser = Auth::user();
        $organization_id = $authUser->organization_id;

        // Fetch the user you want to add
        $addingUser = User::find($request->user_id);

        if (! $addingUser) {
            return back()->with('error', 'User not found.');
        }

        // Check if already assigned to an organization
        if ($addingUser->organization_id) {
            return back()->with('error', 'This user already belongs to an organization.');
        }

        // Assign organization and role
        $addingUser->organization_id = $organization_id;
        $addingUser->role_id = $request->role_id;
        $addingUser->save();

        return redirect()->route('users.index')
            ->with('success', 'User successfully added to your organization.');
    }


    public function removeuser($id)
    {
        $authUser = Auth::user();
        $organization_id = $authUser->organization_id;

        $userToRemove = User::find($id);

        if (! $userToRemove) {
            return back()->with('error', 'User not found.');
        }

        // Check if user belongs to the same organization
        if ($userToRemove->organization_id !== $organization_id) {
            return back()->with('error', 'You cannot remove a user from another organization.');
        }

        // Prevent removing yourself
        if ($userToRemove->id === $authUser->id) {
            return back()->with('error', 'You cannot remove yourself.');
        }

        // Remove org and role
        $userToRemove->organization_id = null;
        $userToRemove->role_id = null;
        $userToRemove->save();

        return redirect()->route('users.index')
            ->with('success', 'User successfully removed from your organization.');
    }
}
