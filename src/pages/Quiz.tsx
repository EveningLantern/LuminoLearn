
import { PageHeader } from "@/components/PageHeader";

const Quiz = () => {
  return (
    <div className="min-h-screen pt-24 px-6 pb-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Quiz Center" 
          description="Test your knowledge with interactive quizzes"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Mathematics</h3>
            <p className="text-gray-600">10 questions • 15 minutes</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded">
              Start Quiz
            </button>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Physics</h3>
            <p className="text-gray-600">15 questions • 20 minutes</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded">
              Start Quiz
            </button>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Chemistry</h3>
            <p className="text-gray-600">12 questions • 18 minutes</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded">
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
