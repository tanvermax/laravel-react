import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import CreateClassModal from './CreateClassModal';

export default function ClassesIndex({ classes, flash }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Success message handling
    if (flash?.success) {
        toast.success(flash.success);
    }

    return (
        <>
            <Head title="My Classes" />
            <div className="p-6">
                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold">My Classes</h1>
                    <Button onClick={() => setIsModalOpen(true)}>
                        + Create Class
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {classes.map((classItem: any) => (
                        <Link key={classItem.id} href={`/teacher/classes/${classItem.id}`}>
                            <Card className="hover:shadow-lg cursor-pointer transition-shadow">
                                <CardHeader>
                                    <CardTitle>{classItem.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600">{classItem.subject}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {classItem.students_count || 0} Students
                                    </p>
                                    {classItem.section && (
                                        <p className="text-xs text-gray-500">
                                            Section: {classItem.section}
                                        </p>
                                    )}
                                    <Link href={`/teacher/classes/${classItem.id}/attendance`}>
                                <Button variant="outline" size="sm" className="w-full">
                                    Take Attendance
                                </Button>
                            </Link>

                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {classes.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">No classes created yet</p>
                        <Button onClick={() => setIsModalOpen(true)}>
                            Create Your First Class
                        </Button>
                    </div>
                )}

                {/* Create Class Modal */}
                <CreateClassModal
                    open={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </>
    );
}