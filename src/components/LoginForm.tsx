
import { useState } from "react";
import { motion } from "framer-motion";

export const LoginForm = () => {
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
        
        {!role ? (
          <div className="space-y-4">
            <button
              onClick={() => setRole("student")}
              className="w-full btn-primary mb-4"
            >
              Login as Student
            </button>
            <button
              onClick={() => setRole("teacher")}
              className="w-full btn-primary bg-secondary hover:bg-secondary-hover"
            >
              Login as Teacher
            </button>
          </div>
        ) : (
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {role === "student" ? "Student ID" : "Teacher ID"}
              </label>
              <input
                type="text"
                className="input-field w-full"
                placeholder={`Enter your ${role} ID`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="input-field w-full"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="w-full btn-primary">
              Login
            </button>
            <button
              onClick={() => setRole(null)}
              className="w-full text-sm text-gray-600 hover:text-primary"
            >
              Back to role selection
            </button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};
