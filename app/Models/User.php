<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'email', 'password', 'age', 'role'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'age',
        'role',  // user, teacher, student, admin
    ];
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }


    public function isTeacher(): bool
    {
        return $this->role === 'teacher';
    }
    public function isStudent(): bool
    {
        return $this->role === 'student';
    }


    public function getMenuItems():array
    {
        $commonMenus = [
            [
                'title' => 'Dashboard',
                'href' => route('dashboard'),
                'icon' => 'LayoutGrid',
            ],
        ];
$teacherMenus = [
            [
                'title' => 'My Courses',
                'href' => route('teacher.courses'),
                'icon' => 'BookOpen',
            ],
            [
                'title' => 'Create Course',
                'href' => route('teacher.courses.create'),
                'icon' => 'PlusCircle',
            ],
            [
                'title' => 'Students',
                'href' => route('teacher.students'),
                'icon' => 'Users',
            ],
            [
                'title' => 'Assignments',
                'href' => route('teacher.assignments'),
                'icon' => 'FileText',
            ],
        ];

        $studentMenus = [
            [
                'title' => 'My Enrollments',
                'href' => route('student.enrollments'),
                'icon' => 'GraduationCap',
            ],
            [
                'title' => 'Available Courses',
                'href' => route('student.courses'),
                'icon' => 'BookOpen',
            ],
            [
                'title' => 'My Assignments',
                'href' => route('student.assignments'),
                'icon' => 'FileText',
            ],
            [
                'title' => 'Progress',
                'href' => route('student.progress'),
                'icon' => 'TrendingUp',
            ],
        ];

        return match ($this->role){
            'teacher'=>array_merge($commonMenus, $teacherMenus),
            'student' => array_merge($commonMenus, $studentMenus),
        };

    }
}
