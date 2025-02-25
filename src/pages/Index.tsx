
import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    </div>
  );
};

export default Index;
