import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, CheckCircle, XCircle, Clock, AlertCircle, Save, ArrowLeft } from 'lucide-react';

export default function StataticCard({totalStudents,
    presentCount,
    absentCount,
    lateCount}:{totalStudents:any,
    presentCount:number,
    absentCount:number,
    lateCount:number}) {
  return (
  
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <Card className="border-green-200 bg-green-50">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-green-600">{totalStudents}</div>
                                <div className="text-sm text-gray-600">Present</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-red-200 bg-red-50">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-red-600">{presentCount}</div>
                                <div className="text-sm text-gray-600">Absent</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-yellow-200 bg-yellow-50">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-yellow-600">{absentCount}</div>
                                <div className="text-sm text-gray-600">Late</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <AlertCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-blue-600">{lateCount}</div>
                                <div className="text-sm text-gray-600">Excused</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

  );
}