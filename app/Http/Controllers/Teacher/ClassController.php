<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\ClasssModel;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassController extends Controller
{
    //

    public function index()
    {
        $classes = ClasssModel::where('teacher_id', auth()->id())
            ->withCount('students')
            ->latest()
            ->get();

        return Inertia::render('teacher/classes/index', [
            'classes' => $classes
        ]);
    }
    public function create()
    {
        return Inertia::render('teacher/classes/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'description' => 'nullable|string',
            'room_number' => 'nullable|string',
            'section' => 'nullable|string',
            'start_time' => 'nullable',
            'end_time' => 'nullable',
        ]);

        ClasssModel::create([
            'teacher_id' => auth()->id(),
            'name' => $request->name,
            'subject' => $request->subject,
            'description' => $request->description,
            'room_number' => $request->room_number,
            'section' => $request->section,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
        ]);

        return redirect()->route('teacher.classes.index');
    }

    public function show(ClasssModel $class)
    {
        if ($class->teacher_id !== auth()->id()) {
            abort(403);
        }

        $class->load(['students' => function($query) {
            $query->wherePivot('status', 'active');
        }]);

        return Inertia::render('teacher/classes/show', [
            'class' => $class
        ]);
    }

    public function addStudent(Request $request, ClasssModel $class)
    {
        $request->validate([
            'student_email' => 'required|email|exists:users,email'
        ]);

        $student = User::where('email', $request->student_email)
            ->where('role', 'student')
            ->firstOrFail();

        if (!$class->students()->where('student_id', $student->id)->exists()) {
            $class->students()->attach($student->id, ['enrolled_at' => now()]);
        }

        return back();
    }

    public function destroy(ClasssModel $class)
    {
        if ($class->teacher_id !== auth()->id()) {
            abort(403);
        }

        $class->delete();

        return redirect()->route('teacher.classes.index');
    }
}
