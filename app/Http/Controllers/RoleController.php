<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
        public function getroles()
    {
        $roles = Role::latest()->get();
        return response()->json($roles);
    }
}
