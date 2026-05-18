<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //

    public function index()
    {
        $user = auth()->user();

        return Inertia::render('dashboard', [
            'userRole' => $user->role,
            'menuItem' => $user->getMenuItems(),
            'isTeacher' => $user->isTeacher(),
            'isStudent' => $user->isStudent(),
        ]);
    }
}
