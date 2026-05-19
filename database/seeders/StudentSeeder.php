<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $students = [
            [
                'name' => 'Rahim Uddin',
                'email' => 'rahim@example.com',
                'password' => Hash::make('password'),
                'age' => 20,
                'role' => 'student',
            ],
            [
                'name' => 'Karim Mia',
                'email' => 'karim@example.com',
                'password' => Hash::make('password'),
                'age' => 21,
                'role' => 'student',
            ],
            [
                'name' => 'Fatema Begum',
                'email' => 'fatema@example.com',
                'password' => Hash::make('password'),
                'age' => 19,
                'role' => 'student',
            ],
            [
                'name' => 'Shahina Akter',
                'email' => 'shahina@example.com',
                'password' => Hash::make('password'),
                'age' => 22,
                'role' => 'student',
            ],
            [
                'name' => 'Nurul Hasan',
                'email' => 'nurul@example.com',
                'password' => Hash::make('password'),
                'age' => 20,
                'role' => 'student',
            ],
            [
                'name' => 'Tania Sultana',
                'email' => 'tania@example.com',
                'password' => Hash::make('password'),
                'age' => 18,
                'role' => 'student',
            ],
            [
                'name' => 'Sakib Khan',
                'email' => 'sakib@example.com',
                'password' => Hash::make('password'),
                'age' => 23,
                'role' => 'student',
            ],
            [
                'name' => 'Mim Akter',
                'email' => 'mim@example.com',
                'password' => Hash::make('password'),
                'age' => 20,
                'role' => 'student',
            ],
            [
                'name' => 'Rakib Hossain',
                'email' => 'rakib@example.com',
                'password' => Hash::make('password'),
                'age' => 22,
                'role' => 'student',
            ],
            [
                'name' => 'Sumaiya Islam',
                'email' => 'sumaiya@example.com',
                'password' => Hash::make('password'),
                'age' => 21,
                'role' => 'student',
            ],
        ];

        foreach ($students as $student) {
            User::create($student);
        }

        $this->command->info('10 students created successfully!');
    
    }
}
