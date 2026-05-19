<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\ClasssModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;



class AttendanceController extends Controller
{
    // Attendance ফর্ম দেখানোর জন্য
    public function index(ClasssModel $class)
    {
        // Check করা এই ক্লাস কি এই teacher এর
        if ($class->teacher_id !== auth()->id()) {
            abort(403);
        }

        // আজকের তারিখ
        $today = date('Y-m-d');

        // এই ক্লাসের সব active student
        $students = $class->students()
            ->wherePivot('status', 'active')
            ->get();

        // আজকের attendance record
        $attendances = Attendance::where('class_id', $class->id)
            ->where('date', $today)
            ->get()
            ->keyBy('student_id');

        // Student এর সাথে attendance status যোগ করা
        $studentsWithAttendance = $students->map(function ($student) use ($attendances) {
            $attendance = $attendances->get($student->id);
            return [
                'id' => $student->id,
                'name' => $student->name,
                'email' => $student->email,
                'status' => $attendance ? $attendance->status : null,
                'attendance_id' => $attendance ? $attendance->id : null,
            ];
        });

        return Inertia::render('teacher/attendance/index', [
            'class' => $class,
            'students' => $studentsWithAttendance,
            'date' => $today,
            'totalStudents' => $students->count(),
            'presentCount' => $attendances->where('status', 'present')->count(),
            'absentCount' => $attendances->where('status', 'absent')->count(),
            'lateCount' => $attendances->where('status', 'late')->count(),
        ]);
    }

    // Attendance store করার জন্য
    public function store(Request $request, ClasssModel $class)
    {
        // Check করা এই ক্লাস কি এই teacher এর
        if ($class->teacher_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'date' => 'required|date',
            'attendances' => 'required|array',
            'attendances.*.student_id' => 'required|exists:users,id',
            'attendances.*.status' => 'required|in:present,absent,late,excused',
        ]);

        foreach ($request->attendances as $attendanceData) {
            Attendance::updateOrCreate(
                [
                    'class_id' => $class->id,
                    'student_id' => $attendanceData['student_id'],
                    'date' => $request->date,
                ],
                [
                    'status' => $attendanceData['status'],
                    'marked_by' => auth()->id(),
                ]
            );
        }

        return redirect()->back()->with('success', 'Attendance saved successfully!');
    }

    // রিপোর্ট দেখানোর জন্য (যোগ করুন)
    public function report(ClasssModel $class, Request $request)
    {
        if ($class->teacher_id !== auth()->id()) {
            abort(403);
        }

        $month = $request->get('month', Carbon::now()->month);
        $year = $request->get('year', Carbon::now()->year);

        $students = $class->students()
            ->wherePivot('status', 'active')
            ->get();

        $startDate = Carbon::create($year, $month, 1)->startOfMonth();
        $endDate = Carbon::create($year, $month, 1)->endOfMonth();

        $attendances = Attendance::where('class_id', $class->id)
            ->whereBetween('date', [$startDate, $endDate])
            ->get()
            ->groupBy('student_id');

        $summary = [];
        foreach ($students as $student) {
            $studentAttendance = $attendances[$student->id] ?? collect();
            $total = $studentAttendance->count();
            $present = $studentAttendance->where('status', 'present')->count();
            $absent = $studentAttendance->where('status', 'absent')->count();
            $late = $studentAttendance->where('status', 'late')->count();
            $excused = $studentAttendance->where('status', 'excused')->count();

            $percentage = $total > 0 ? round(($present + ($late * 0.5)) / $total * 100, 2) : 0;

            $summary[$student->id] = [
                'total' => $total,
                'present' => $present,
                'absent' => $absent,
                'late' => $late,
                'excused' => $excused,
                'percentage' => $percentage,
            ];
        }

        return Inertia::render('teacher/attendance/report', [
            'class' => $class,
            'students' => $students,
            'summary' => $summary,
            'month' => $month,
            'year' => $year,
            'months' => $this->getMonths(),
            'years' => range(2020, now()->year),
        ]);
    }

    private function getMonths()
    {
        return [
            1 => 'January',
            2 => 'February',
            3 => 'March',
            4 => 'April',
            5 => 'May',
            6 => 'June',
            7 => 'July',
            8 => 'August',
            9 => 'September',
            10 => 'October',
            11 => 'November',
            12 => 'December'
        ];
    }
}
