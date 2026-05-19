<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClasssModel extends Model
{
    //
    use HasFactory;
    protected $table = 'classes';
    protected $fillable = [
        'teacher_id',
        'name',
        'subject',
        'description',
        'room_number',
        'section',
        'start_time',
        'end_time',
        'status'
    ];
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
    public function students()
    {
        return $this->belongsToMany(User::class, 'class_student', 'class_id', 'student_id')
                    ->withPivot('enrolled_at', 'status')
                    ->withTimestamps();
    }
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
