
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Play, FileText, Zap } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const Quiz = () => {
  const [quizCode, setQuizCode] = useState("");
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);
  const { toast } = useToast();

  const handleJoinQuiz = () => {
    if (!quizCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a quiz code",
        variant: "destructive",
      });
      return;
    }
    // This would connect to the live quiz session
    toast({
      title: "Joining quiz",
      description: "Connecting to live quiz session...",
    });
  };

  const handleCreateQuiz = () => {
    // Navigate to quiz creation page
    window.location.href = "/quiz/create";
  };

  // Check user role on component mount
  useState(() => {
    const getUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserRole(user.user_metadata?.role || null);
      }
    };
    getUserRole();
  });

  return (
    <div className="min-h-screen pt-24 px-6 pb-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Quiz Center" 
          description={userRole === "teacher" ? 
            "Create and manage quizzes for your students" : 
            "Test your knowledge with interactive quizzes"
          }
        />

        {userRole === "teacher" ? (
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Create New Quiz</h3>
              <div className="space-y-4">
                <Button onClick={handleCreateQuiz} className="w-full md:w-auto">
                  <FileText className="w-5 h-5 mr-2" />
                  Create Quiz Paper
                </Button>
                <Button onClick={handleCreateQuiz} variant="secondary" className="w-full md:w-auto">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Live Quiz
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Previous quizzes list */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Mathematics Quiz</h3>
                <p className="text-gray-600 mb-4">Created on March 15, 2024</p>
                <p className="text-sm text-gray-500 mb-2">Quiz Code: MATH101</p>
                <Button variant="outline" className="w-full">View Results</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Join Live Quiz</h3>
              <div className="flex gap-4 flex-col md:flex-row">
                <Input
                  placeholder="Enter quiz code"
                  value={quizCode}
                  onChange={(e) => setQuizCode(e.target.value)}
                  className="md:w-64"
                />
                <Button onClick={handleJoinQuiz}>
                  <Play className="w-5 h-5 mr-2" />
                  Join Quiz
                </Button>
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Practice Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Mathematics</h3>
                <p className="text-gray-600">10 questions • 15 minutes</p>
                <Button className="mt-4" variant="outline">
                  Start Practice
                </Button>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Physics</h3>
                <p className="text-gray-600">15 questions • 20 minutes</p>
                <Button className="mt-4" variant="outline">
                  Start Practice
                </Button>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Chemistry</h3>
                <p className="text-gray-600">12 questions • 18 minutes</p>
                <Button className="mt-4" variant="outline">
                  Start Practice
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
