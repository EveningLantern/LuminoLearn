
import { motion } from "framer-motion";
import { Book, Users, Brain, BarChart } from "lucide-react";

const features = [
  {
    title: "Doubt Clearing",
    icon: Brain,
    color: "bg-blue-500",
    description: "Get instant help with your academic questions",
  },
  {
    title: "Teacher Connect",
    icon: Users,
    color: "bg-green-500",
    description: "Connect with your teachers directly",
  },
  {
    title: "Quiz",
    icon: Book,
    color: "bg-purple-500",
    description: "Test your knowledge with interactive quizzes",
  },
  {
    title: "Student Dashboard",
    icon: BarChart,
    color: "bg-orange-500",
    description: "Track your academic progress",
  },
];

export const Dashboard = () => {
  return (
    <div className="min-h-screen pt-24 px-6 pb-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 mb-8"
        >
          Welcome back
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
