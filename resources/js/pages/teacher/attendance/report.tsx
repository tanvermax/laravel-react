import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, Download, TrendingUp, Users, Calendar } from 'lucide-react';

export default function Report({ class: classItem, students, summary, month, year, months, years }: any) {
    const [selectedMonth, setSelectedMonth] = useState(month);
    const [selectedYear, setSelectedYear] = useState(year);

    const handleFilterChange = () => {
        router.get(`/teacher/attendance/${classItem.id}/report`, {
            month: selectedMonth,
            year: selectedYear,
        });
    };

    const overallStats = {
        totalStudents: students.length,
        averageAttendance: students.reduce((acc: number, student: any) => {
            return acc + (summary[student.id]?.percentage || 0);
        }, 0) / (students.length || 1),
        above75: students.filter((s: any) => (summary[s.id]?.percentage || 0) >= 75).length,
        below60: students.filter((s: any) => (summary[s.id]?.percentage || 0) < 60).length,
    };

    return (
        <>
            <Head title="Attendance Report" />
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Link href="/teacher/attendance">
                            <Button variant="ghost" size="sm">
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Back
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">Attendance Report</h1>
                    </div>
                    <p className="text-gray-600">
                        {classItem.name} - {classItem.subject}
                    </p>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap gap-4 items-end">
                            <div className="w-48">
                                <label className="text-sm font-medium mb-2 block">Month</label>
                                <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(months).map(([key, name]) => (
                                            <SelectItem key={key} value={key}>{name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-32">
                                <label className="text-sm font-medium mb-2 block">Year</label>
                                <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map((y: number) => (
                                            <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleFilterChange}>Apply Filter</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Students</p>
                                    <p className="text-2xl font-bold">{overallStats.totalStudents}</p>
                                </div>
                                <Users className="w-8 h-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Average Attendance</p>
                                    <p className="text-2xl font-bold">{overallStats.averageAttendance.toFixed(1)}%</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-green-500" />
                            </div>
                            <Progress value={overallStats.averageAttendance} className="mt-2" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Above 75%</p>
                                    <p className="text-2xl font-bold text-green-600">{overallStats.above75}</p>
                                </div>
                                <div className="text-sm text-gray-500">students</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Below 60%</p>
                                    <p className="text-2xl font-bold text-red-600">{overallStats.below60}</p>
                                </div>
                                <div className="text-sm text-gray-500">students</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Student-wise Attendance Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4">#</th>
                                        <th className="text-left py-3 px-4">Student Name</th>
                                        <th className="text-center py-3 px-4">Present</th>
                                        <th className="text-center py-3 px-4">Absent</th>
                                        <th className="text-center py-3 px-4">Late</th>
                                        <th className="text-center py-3 px-4">Excused</th>
                                        <th className="text-center py-3 px-4">Total</th>
                                        <th className="text-center py-3 px-4">Attendance %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student: any, index: number) => {
                                        const stats = summary[student.id] || { 
                                            present: 0, absent: 0, late: 0, excused: 0, total: 0, percentage: 0 
                                        };
                                        return (
                                            <tr key={student.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">{index + 1}</td>
                                                <td className="py-3 px-4">
                                                    <div className="font-medium">{student.name}</div>
                                                    <div className="text-xs text-gray-500">{student.email}</div>
                                                </td>
                                                <td className="text-center py-3 px-4 text-green-600 font-medium">{stats.present}</td>
                                                <td className="text-center py-3 px-4 text-red-600">{stats.absent}</td>
                                                <td className="text-center py-3 px-4 text-yellow-600">{stats.late}</td>
                                                <td className="text-center py-3 px-4 text-blue-600">{stats.excused}</td>
                                                <td className="text-center py-3 px-4">{stats.total}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-2">
                                                        <Progress value={stats.percentage} className="w-24" />
                                                        <span className={`font-medium ${
                                                            stats.percentage >= 75 ? 'text-green-600' : 
                                                            stats.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                                                        }`}>
                                                            {stats.percentage}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}