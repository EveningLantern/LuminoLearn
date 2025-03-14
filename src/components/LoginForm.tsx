
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { User, UserCog } from "lucide-react";

type UserRole = "student" | "teacher" | null;
type FormView = "login" | "register" | "forgot-password" | "reset-password";

export const LoginForm = () => {
  const [formView, setFormView] = useState<FormView>("login");
  const [role, setRole] = useState<UserRole>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    resetToken: ""
  });
  
  useEffect(() => {
    // Check if we're in a password reset flow
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
      setFormView("reset-password");
    }
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: window.location.origin,
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email.",
      });
      setFormView("login");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password has been reset successfully. You can now login.",
      });
      setFormView("login");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formView === "register") {
      // Registration validation
      if (!role) {
        toast({
          title: "Error",
          description: "Please select a role (Student or Teacher)",
          variant: "destructive",
        });
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }
      
      if (formData.password.length < 6) {
        toast({
          title: "Error",
          description: "Password must be at least 6 characters long",
          variant: "destructive",
        });
        return;
      }

      try {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              role: role,
              name: formData.name,
              id: formData.id,
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Registration successful! Please check your email to verify your account.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } else if (formView === "login") {
      // Login logic
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };
  
  const renderForgotPasswordForm = () => (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
      onSubmit={handleForgotPassword}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="Enter your email"
          required
        />
      </div>

      <button type="submit" className="w-full btn-primary">
        Send Reset Instructions
      </button>

      <button
        type="button"
        onClick={() => setFormView("login")}
        className="w-full text-sm text-primary hover:text-primary-hover"
      >
        Back to Login
      </button>
    </motion.form>
  );

  const renderResetPasswordForm = () => (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
      onSubmit={handleResetPassword}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="Enter new password"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="Confirm new password"
          required
        />
      </div>

      <button type="submit" className="w-full btn-primary">
        Reset Password
      </button>
    </motion.form>
  );
  
  const renderLoginForm = () => (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="Enter your email"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="Enter your password"
          required
        />
      </div>
      
      <button type="submit" className="w-full btn-primary">
        Login
      </button>
      
      <div className="flex flex-col space-y-2 text-center">
        <button
          type="button"
          onClick={() => setFormView("forgot-password")}
          className="text-sm text-gray-600 hover:text-primary"
        >
          Forgot Password?
        </button>
        <button
          type="button"
          onClick={() => setFormView("register")}
          className="text-sm text-primary hover:text-primary-hover"
        >
          Don't have an account? Register
        </button>
      </div>
    </motion.form>
  );

  const renderRegisterForm = () => (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="Enter your email"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ID Number
        </label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="Enter your ID number"
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setRole("student")}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
            role === "student" 
              ? "bg-primary text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <User size={18} />
          Student
        </button>
        <button
          type="button"
          onClick={() => setRole("teacher")}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
            role === "teacher" 
              ? "bg-primary text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <UserCog size={18} />
          Teacher
        </button>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="Enter your password"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="Confirm your password"
          required
        />
      </div>
      
      <button type="submit" className="w-full btn-primary">
        Create Account
      </button>
      
      <button
        type="button"
        onClick={() => setFormView("login")}
        className="w-full text-sm text-primary hover:text-primary-hover"
      >
        Already have an account? Login
      </button>
    </motion.form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {formView === "forgot-password" 
            ? "Reset Password"
            : formView === "reset-password"
            ? "Set New Password"
            : formView === "register"
            ? "Create Account"
            : "Welcome Back"}
        </h2>
        
        {formView === "forgot-password" 
          ? renderForgotPasswordForm()
          : formView === "reset-password" 
          ? renderResetPasswordForm()
          : formView === "register"
          ? renderRegisterForm()
          : renderLoginForm()
        }
      </motion.div>
    </div>
  );
};
