
import { PageHeader } from "@/components/PageHeader";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen pt-24 px-6 pb-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Class Schedule" 
          description="Manage your classes and deadlines"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Calendar</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </div>
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Today's Schedule</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <div>
                  <h4 className="font-medium">Mathematics</h4>
                  <p className="text-sm text-gray-600">Advanced Calculus</p>
                </div>
                <span className="text-blue-600">9:00 AM</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <div>
                  <h4 className="font-medium">Physics</h4>
                  <p className="text-sm text-gray-600">Quantum Mechanics</p>
                </div>
                <span className="text-purple-600">11:00 AM</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <div>
                  <h4 className="font-medium">Chemistry</h4>
                  <p className="text-sm text-gray-600">Organic Chemistry</p>
                </div>
                <span className="text-green-600">2:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
