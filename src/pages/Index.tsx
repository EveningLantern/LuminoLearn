
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";
import { Navigation } from "@/components/Navigation";
import { supabase } from "@/lib/supabaseClient";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoggedIn(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen">
      {isLoggedIn ? (
        <>
          <Navigation />
          <Dashboard />
        </>
      ) : (
        <LoginForm />
      )}
      <Toaster />
    </div>
  );
};

export default Index;
