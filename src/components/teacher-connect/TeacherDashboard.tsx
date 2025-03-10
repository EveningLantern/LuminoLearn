
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studentBatches, submissions } from "@/utils/teacherData";
import { useNavigate } from "react-router-dom";
import { File, Users, Clock, ChevronRight, FileText } from "lucide-react";

export const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeBatch, setActiveBatch] = useState<string | null>(null);
  const [batchList, setBatchList] = useState<string[]>([]);
  
  useEffect(() => {
    // Get list of batches
    const batches = Object.keys(studentBatches);
    setBatchList(batches);
    
    if (batches.length > 0) {
      setActiveBatch(batches[0]);
    }
  }, []);
  
  const handleStudentClick = (studentId: number) => {
    navigate(`/connect/chat/1?student=${studentId}`);
  };
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Your Batches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeBatch || ""} onValueChange={setActiveBatch}>
            <TabsList className="mb-4 flex overflow-x-auto pb-2 space-x-2">
              {batchList.map((batch) => (
                <TabsTrigger key={batch} value={batch} className="whitespace-nowrap">
                  {batch.replace('-', ' ')}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {batchList.map((batch) => (
              <TabsContent key={batch} value={batch}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {batch.split('-')[0]} Session
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View Submissions
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {studentBatches[batch]?.map((student) => (
                      <div 
                        key={student.id}
                        className="flex justify-between items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                        onClick={() => handleStudentClick(student.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <File className="mr-1 h-3 w-3" />
                              <span>{student.submissions} submissions</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Recent Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {submissions.slice(0, 5).map((submission) => (
              <div 
                key={submission.id}
                className="flex justify-between items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{submission.fileName}</h4>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{new Date(submission.submittedAt).toLocaleString()}</span>
                    <span className="mx-2">•</span>
                    <span>{submission.batchName.replace(/-/g, ' ')}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
