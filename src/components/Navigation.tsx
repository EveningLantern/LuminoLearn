
import { useState, useEffect } from "react";
import { Menu, User, LogOut, Settings, Bell, Student, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserRole(user.user_metadata?.role || null);
        setUserName(user.user_metadata?.name || null);
      }
    };
    
    getUserData();
    
    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserRole(session.user.user_metadata?.role || null);
        setUserName(session.user.user_metadata?.name || null);
      } else {
        setUserRole(null);
        setUserName(null);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 glass-card z-50 px-6 py-4 flex justify-between items-center">
      <h1 
        onClick={() => navigate('/')}
        className="text-2xl font-semibold text-primary cursor-pointer hover:opacity-80 transition-opacity"
      >
        EduConnect
      </h1>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="nav-item relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                2
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="px-4 py-2 font-medium text-sm">Notifications</div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-3">
              <div className="flex flex-col">
                <span className="font-medium">New Quiz Available</span>
                <span className="text-xs text-gray-500">Mathematics - 10 questions</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-3">
              <div className="flex flex-col">
                <span className="font-medium">Assignment Due Soon</span>
                <span className="text-xs text-gray-500">Physics - Tomorrow at 11:59 PM</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="nav-item flex items-center gap-2">
              {userRole === "teacher" ? (
                <UserCog className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
              {userName && (
                <span className="hidden md:inline-block">
                  {userName}
                  {userRole && (
                    <span className="text-xs ml-1 text-gray-500">
                      ({userRole === "teacher" ? "Teacher" : "Student"})
                    </span>
                  )}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="w-4 h-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
