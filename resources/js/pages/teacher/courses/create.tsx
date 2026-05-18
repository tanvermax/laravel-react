// resources/js/Pages/teacher/courses/create.tsx
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function CreateCourse() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        price: '',
        start_date: '',
        end_date: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/teacher/courses'); // store রoute এ submit করবে
    };

    return (
        <>
            <Head title="Create New Course" />
            
            <div className="container mx-auto py-10">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Create New Course</CardTitle>
                        <CardDescription>
                            Fill in the details to create a new course
                        </CardDescription>
                    </CardHeader>
                    
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Course Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Enter course title"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter course description"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm">{errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    placeholder="Enter price"
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-sm">{errors.price}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Start Date</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="end_date">End Date</Label>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Course'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
}