
import { PageHeader } from "@/components/PageHeader";

const TeacherConnect = () => {
  return (
    <div className="min-h-screen pt-24 px-6 pb-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Teacher Connect" 
          description="Connect with your teachers for personalized guidance"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Demo content */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Schedule Consultation</h3>
            <p className="text-gray-600">Book one-on-one sessions with your teachers</p>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Message Teachers</h3>
            <p className="text-gray-600">Direct messaging system for quick queries</p>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
            <p className="text-gray-600">View teacher availability and office hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherConnect;
