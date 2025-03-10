
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { TeacherCard } from "@/components/teacher-connect/TeacherCard";
import { ChatInterface } from "@/components/teacher-connect/ChatInterface";
import { TeacherDashboard } from "@/components/teacher-connect/TeacherDashboard";
import { teachers } from "@/utils/teacherData";
import { supabase } from "@/lib/supabaseClient";
import { Navigation } from "@/components/Navigation";

const TeacherConnect = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);
  
  useEffect(() => {
    // Get user role
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserRole(user.user_metadata?.role || null);
      }
    };
    
    getUserData();
  }, []);
  
  const isRootPath = location.pathname === "/connect";
  
  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-24 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={
              <>
                {userRole === "teacher" ? (
                  <>
                    <PageHeader 
                      title="Teacher Dashboard" 
                      description="Manage your students and view submissions"
                    />
                    <TeacherDashboard />
                  </>
                ) : (
                  <>
                    <PageHeader 
                      title="Teacher Connect" 
                      description="Connect with your teachers for personalized guidance"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {teachers.map((teacher) => (
                        <TeacherCard 
                          key={teacher.id}
                          id={teacher.id}
                          name={teacher.name}
                          subject={teacher.subject}
                          image={teacher.image}
                          description={teacher.description}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            } />
            <Route path="/chat/:teacherId" element={<ChatInterface />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default TeacherConnect;
