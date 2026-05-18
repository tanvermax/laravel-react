<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('teacher/courses/index', [
            'courses' => auth()->user()?->courses ?? [], // আপনার logic অনুযায়ী
        ]);
    }
    
    public function create()
    {
        return Inertia::render('teacher/courses/create');
    }
    
}
