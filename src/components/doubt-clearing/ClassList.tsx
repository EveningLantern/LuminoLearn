
import { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClassListProps {
  searchQuery: string;
  onJoinClass: (classId: string) => void;
  userRole: "student" | "teacher" | null;
}

const DEFAULT_CLASS_CODE = "abcd1234";

export const ClassList = ({ searchQuery, onJoinClass, userRole }: ClassListProps) => {
  const [joiningClass, setJoiningClass] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState("");
  const { toast } = useToast();

  const mockClasses = [
    {
      id: "1",
      name: "Mathematics Advanced",
      teacher: "Dr. Smith",
      status: "ongoing",
      startTime: new Date(),
      classId: "MATH101"
    },
    {
      id: "2",
      name: "Physics Fundamentals",
      teacher: "Prof. Johnson",
      status: "upcoming",
      startTime: new Date(Date.now() + 3600000),
      classId: "PHYS101"
    }
  ];

  const filteredClasses = mockClasses.filter(cls => 
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.classId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinAttempt = (classId: string) => {
    setJoiningClass(classId);
  };

  const handleSubmitCode = () => {
    if (codeInput === DEFAULT_CLASS_CODE) {
      onJoinClass(joiningClass!);
      toast({
        title: "Success",
        description: "Joined the class successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid class code",
        variant: "destructive",
      });
    }
    setJoiningClass(null);
    setCodeInput("");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-500" />
            Ongoing Sessions
          </h2>
          {filteredClasses
            .filter(cls => cls.status === "ongoing")
            .map(cls => (
              <div key={cls.id} className="glass-card p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{cls.name}</h3>
                  <button
                    className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center"
                    onClick={() => toast({
                      title: "Class ID",
                      description: cls.classId,
                    })}
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    ID
                  </button>
                </div>
                <p className="text-sm text-gray-600">{cls.teacher}</p>
                {joiningClass === cls.id ? (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter class code"
                      className="w-full p-2 border rounded mb-2"
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSubmitCode}
                        className="bg-primary text-white px-3 py-1 rounded text-sm"
                      >
                        Join
                      </button>
                      <button
                        onClick={() => setJoiningClass(null)}
                        className="bg-gray-200 px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleJoinAttempt(cls.id)}
                    className="mt-2 text-primary text-sm hover:underline"
                  >
                    Join Session
                  </button>
                )}
              </div>
            ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Upcoming Sessions
          </h2>
          {filteredClasses
            .filter(cls => cls.status === "upcoming")
            .map(cls => (
              <div key={cls.id} className="glass-card p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{cls.name}</h3>
                  <button
                    className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center"
                    onClick={() => toast({
                      title: "Class ID",
                      description: cls.classId,
                    })}
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    ID
                  </button>
                </div>
                <p className="text-sm text-gray-600">{cls.teacher}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Starts in: {Math.floor((cls.startTime.getTime() - Date.now()) / 60000)} minutes
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
