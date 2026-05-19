import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, CheckCircle, XCircle, Clock, AlertCircle, Save, ArrowLeft } from 'lucide-react';
import StataticCard from './StataticCard';

export default function Create({ class: classItem, students, selectedDate, stats }: any) {
    const [attendanceData, setAttendanceData] = useState(
        students.reduce((acc: any, student: any) => {
            acc[student.id] = {
                student_id: student.id,
                status: student.status || 'present',
                remarks: student.remarks || '',
            };
            return acc;
        }, {})
    );

    const [processing, setProcessing] = useState(false);

    const updateAttendance = (studentId: number, status: string) => {
        setAttendanceData((prev: any) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                status: status
            }
        }));
    };

    const updateRemarks = (studentId: number, remarks: string) => {
        setAttendanceData((prev: any) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                remarks: remarks
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        
        const attendances = Object.values(attendanceData);
        
        router.post(`/teacher/classes/${classItem.id}/attendance`, {
            date: selectedDate,
            attendances: attendances
        }, {
            onSuccess: () => {
                alert('Attendance saved successfully!');
                setProcessing(false);
            },
            onError: (errors) => {
                console.error(errors);
                alert('Failed to save attendance');
                setProcessing(false);
            }
        });
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'present': return 'bg-green-500 hover:bg-green-600';
            case 'absent': return 'bg-red-500 hover:bg-red-600';
            case 'late': return 'bg-yellow-500 hover:bg-yellow-600';
            case 'excused': return 'bg-blue-500 hover:bg-blue-600';
            default: return 'bg-gray-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'present': return <CheckCircle className="w-4 h-4" />;
            case 'absent': return <XCircle className="w-4 h-4" />;
            case 'late': return <Clock className="w-4 h-4" />;
            case 'excused': return <AlertCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    const currentStats = {
        present: Object.values(attendanceData).filter((a: any) => a.status === 'present').length,
        absent: Object.values(attendanceData).filter((a: any) => a.status === 'absent').length,
        late: Object.values(attendanceData).filter((a: any) => a.status === 'late').length,
        excused: Object.values(attendanceData).filter((a: any) => a.status === 'excused').length,
    };

    return (
        <>
            <Head title="Take Attendance" />
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back
                        </Button>
                        <h1 className="text-2xl font-bold">Take Attendance</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600">
                            {classItem.name} - {classItem.subject}
                        </p>
                        <Badge variant="outline" className="px-3 py-1">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {selectedDate}
                        </Badge>
                    </div>
                </div>

                {/* Statistics Cards */}
                
<StataticCard/>
                {/* Attendance Form */}
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Attendance List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {students && students.length > 0 ? (
                                <div className="space-y-3">
                                    {students.map((student: any, index: number) => (
                                        <div key={student.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="font-semibold text-lg">
                                                        {index + 1}. {student.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{student.email}</div>
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-2">
                                                    {['present', 'absent', 'late', 'excused'].map((status) => (
                                                        <Button
                                                            key={status}
                                                            type="button"
                                                            size="sm"
                                                            variant={attendanceData[student.id]?.status === status ? "default" : "outline"}
                                                            className={`capitalize ${attendanceData[student.id]?.status === status ? getStatusColor(status) : ''}`}
                                                            onClick={() => updateAttendance(student.id, status)}
                                                        >
                                                            {getStatusIcon(status)}
                                                            <span className="ml-1">{status}</span>
                                                        </Button>
                                                    ))}
                                                </div>
                                                
                                                <div className="md:w-64">
                                                    <input
                                                        type="text"
                                                        placeholder="Remarks (optional)"
                                                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={attendanceData[student.id]?.remarks || ''}
                                                        onChange={(e) => updateRemarks(student.id, e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No students enrolled in this class
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {students && students.length > 0 && (
                        <div className="mt-6 flex gap-3">
                            <Button type="submit" disabled={processing} className="min-w-[120px]">
                                {processing ? 'Saving...' : 'Save Attendance'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Cancel
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}