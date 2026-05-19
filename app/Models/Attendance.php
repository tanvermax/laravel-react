<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'class_id', 'student_id', 'date', 'status', 'remarks', 'marked_by'
    ];
    protected $casts = [
        'date' => 'date',
    ];


    public function class()
    {
        return $this->belongsTo(ClasssModel::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function marker()
    {
        return $this->belongsTo(User::class, 'marked_by');
    }
}
