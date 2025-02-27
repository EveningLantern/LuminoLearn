
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ClassList } from "@/components/doubt-clearing/ClassList";
import { ClassRoom } from "@/components/doubt-clearing/ClassRoom";
import { TeacherControls } from "@/components/doubt-clearing/TeacherControls";
import { PageHeader } from "@/components/PageHeader";

export const DoubtClearing = () => {
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeClass, setActiveClass] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.role) {
        setUserRole(user.user_metadata.role);
      }
    };
    getUserRole();
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6 pb-6">
      <div className="max-w-7xl mx-auto">
        {!activeClass ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <PageHeader 
                title="Doubt Clearing Sessions"
                description="Get instant help with your academic questions"
              />
              {userRole === "teacher" && <TeacherControls />}
            </div>

            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Class Name, Teacher, or ID..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <ClassList 
              searchQuery={searchQuery}
              onJoinClass={setActiveClass}
              userRole={userRole}
            />
          </>
        ) : (
          <ClassRoom 
            classId={activeClass}
            onLeaveClass={() => setActiveClass(null)}
            userRole={userRole}
          />
        )}
      </div>
    </div>
  );
};

export default DoubtClearing;
