
import { motion } from "framer-motion";
import { Book, Users, Brain, BarChart, Calendar, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Doubt Clearing",
    icon: Brain,
    color: "bg-blue-500",
    description: "Get instant help with your academic questions",
    route: "/doubts"
  },
  {
    title: "Teacher Connect",
    icon: Users,
    color: "bg-green-500",
    description: "Connect with your teachers directly",
    route: "/connect"
  },
  {
    title: "Quiz",
    icon: Book,
    color: "bg-purple-500",
    description: "Test your knowledge with interactive quizzes",
    route: "/quiz"
  },
  {
    title: "Progress Tracker",
    icon: BarChart,
    color: "bg-orange-500",
    description: "Track your academic progress",
    route: "/progress"
  },
  {
    title: "Schedule",
    icon: Calendar,
    color: "bg-pink-500",
    description: "Manage your class schedule and deadlines",
    route: "/schedule"
  },
  {
    title: "Discussion Forum",
    icon: MessageSquare,
    color: "bg-indigo-500",
    description: "Participate in subject discussions",
    route: "/forum"
  }
];

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 px-6 pb-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to  LuminoLearn
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your all-in-one platform for seamless learning and collaboration
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => navigate(feature.route)}
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

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            Need help? Contact support@luminolearn.com
          </p>
        </motion.div>
      </div>
    </div>
  );
};
