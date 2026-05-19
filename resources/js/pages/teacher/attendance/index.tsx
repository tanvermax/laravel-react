import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock, Calendar, Save } from 'lucide-react';
import StataticCard from './StataticCard';

export default function AttendanceIndex({
    class: classData,
    students,
    date,
    totalStudents,
    presentCount,
    absentCount,
    lateCount,
}: any) {
    const { data, setData, post, processing } = useForm({
        date: date,
        attendances: students.map((student: any) => ({
            student_id: student.id,
            status: student.status || 'present',
        })),
    });

    const updateAttendance = (studentId: number, status: string) => {
        const updatedAttendances = data.attendances.map((att: any) =>
            att.student_id === studentId ? { ...att, status } : att,
        );
        setData('attendances', updatedAttendances);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/teacher/classes/${classData.id}/attendance`);
    };

    const getStatusBadge = (status: string) => {
        const colors = {
            present: 'bg-green-100 text-green-700',
            absent: 'bg-red-100 text-red-700',
            late: 'bg-yellow-100 text-yellow-700',
            excused: 'bg-blue-100 text-blue-700',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100';
    };

    return (
        <>
            <Head title={`Attendance - ${classData.name}`} />
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                        {classData.name} - Attendance
                    </h1>
                    <p className="text-gray-500">{classData.subject}</p>
                </div>

                <StataticCard
                    totalStudents={totalStudents}
                    presentCount={presentCount}
                    absentCount={absentCount}
                    lateCount={lateCount}
                />
                {/* Date Display */}
                <div className="mb-4 flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Date: {new Date(date).toLocaleDateString()}</span>
                </div>

                {/* Attendance Form */}
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Mark Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead className="text-center">
                                            Present
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Absent
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Late
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Excused
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.map((student: any) => {
                                        const currentStatus =
                                            data.attendances.find(
                                                (a: any) =>
                                                    a.student_id === student.id,
                                            )?.status || 'present';

                                        return (
                                            <TableRow key={student.id}>
                                                <TableCell className="font-medium">
                                                    {student.name}
                                                </TableCell>
                                                <TableCell>
                                                    {student.email}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Button
                                                        type="button"
                                                        variant={
                                                            currentStatus ===
                                                            'present'
                                                                ? 'default'
                                                                : 'outline'
                                                        }
                                                        size="sm"
                                                        className="h-8 w-12"
                                                        onClick={() =>
                                                            updateAttendance(
                                                                student.id,
                                                                'present',
                                                            )
                                                        }
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Button
                                                        type="button"
                                                        variant={
                                                            currentStatus ===
                                                            'absent'
                                                                ? 'destructive'
                                                                : 'outline'
                                                        }
                                                        size="sm"
                                                        className="h-8 w-12"
                                                        onClick={() =>
                                                            updateAttendance(
                                                                student.id,
                                                                'absent',
                                                            )
                                                        }
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Button
                                                        type="button"
                                                        variant={
                                                            currentStatus ===
                                                            'late'
                                                                ? 'secondary'
                                                                : 'outline'
                                                        }
                                                        size="sm"
                                                        className="h-8 w-12"
                                                        onClick={() =>
                                                            updateAttendance(
                                                                student.id,
                                                                'late',
                                                            )
                                                        }
                                                    >
                                                        <Clock className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge
                                                        className={`cursor-pointer ${getStatusBadge(currentStatus)}`}
                                                        onClick={() =>
                                                            updateAttendance(
                                                                student.id,
                                                                'excused',
                                                            )
                                                        }
                                                    >
                                                        Excused
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>

                            <div className="mt-6 flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing
                                        ? 'Saving...'
                                        : 'Save Attendance'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    );
}
