<?php

use App\Http\Controllers\Student\EnrollmentController;
use App\Http\Controllers\Teacher\AttendanceController;
use App\Http\Controllers\Teacher\ClassController;
use App\Http\Controllers\Teacher\CourseController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');



    Route::middleware(['role:teacher'])->prefix('teacher')->name('teacher.')->group(function () {

        // Route::get('/courses', [CourseController::class, 'index'])->name('course');
        // Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create');
        // Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');
        // Route::get('/students', [CourseController::class, 'students'])->name('students');
        // Route::get('/assignmßents', [CourseController::class, 'assignments'])->name('assignments');
    });


    Route::middleware(['role:student'])->prefix('student')->name('student.')->group(function () {
        // Route::get('/enrollments', [EnrollmentController::class, 'index'])->name('enrollments');
        // Route::get('/courses', [EnrollmentController::class, 'courses'])->name('courses');
        // Route::get('/assignments', [EnrollmentController::class, 'assignments'])->name('assignments');
        // Route::get('/progress', [EnrollmentController::class, 'progress'])->name('progress');
    });
});


Route::middleware(['auth', 'verified', 'role:teacher'])->prefix('teacher')->name('teacher.')->group(function () {
    
    Route::resource('classes', ClassController::class);
    Route::post('classes/{class}/add-student', [ClassController::class, 'addStudent'])->name('classes.add-student');
    
    Route::get('classes/{class}/attendance', [AttendanceController::class, 'index'])->name('attendance.index');
    Route::post('classes/{class}/attendance', [AttendanceController::class, 'store'])->name('attendance.store');
    

    
});



require __DIR__ . '/settings.php';
