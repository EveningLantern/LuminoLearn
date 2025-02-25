
import { useState } from "react";
import { motion } from "framer-motion";

type UserRole = "student" | "teacher" | null;

export const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your Supabase auth logic here
  };
  
  const renderForm = () => (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      {isRegistering && (
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
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {role === "student" ? "Student ID" : "Teacher ID"}
        </label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder={`Enter your ${role} ID`}
          required
        />
      </div>
      
      {isRegistering && (
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
      )}
      
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
      
      {isRegistering && (
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
      )}
      
      <button type="submit" className="w-full btn-primary">
        {isRegistering ? "Register" : "Login"}
      </button>
      
      <div className="flex flex-col space-y-2 text-center">
        <button
          type="button"
          onClick={() => setRole(null)}
          className="text-sm text-gray-600 hover:text-primary"
        >
          Back to role selection
        </button>
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-sm text-primary hover:text-primary-hover"
        >
          {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
        </button>
      </div>
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
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h2>
        
        {!role ? (
          <div className="space-y-4">
            <button
              onClick={() => setRole("student")}
              className="w-full btn-primary mb-4"
            >
              {isRegistering ? "Register as Student" : "Login as Student"}
            </button>
            <button
              onClick={() => setRole("teacher")}
              className="w-full btn-primary bg-secondary hover:bg-secondary-hover"
            >
              {isRegistering ? "Register as Teacher" : "Login as Teacher"}
            </button>
            {!isRegistering && (
              <button
                onClick={() => setIsRegistering(true)}
                className="w-full text-sm text-primary hover:text-primary-hover mt-4"
              >
                Don't have an account? Register now
              </button>
            )}
          </div>
        ) : (
          renderForm()
        )}
      </motion.div>
    </div>
  );
};
