
import { useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TeacherControls = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [className, setClassName] = useState("");
  const { toast } = useToast();

  const handleCreateClass = () => {
    if (!className.trim()) {
      toast({
        title: "Error",
        description: "Please enter a class name",
        variant: "destructive",
      });
      return;
    }

    // Here we would typically create the class in the database
    toast({
      title: "Success",
      description: `Class "${className}" created successfully`,
    });
    setIsCreating(false);
    setClassName("");
  };

  return (
    <div>
      {isCreating ? (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter class name"
            className="px-3 py-2 border rounded"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <button
            onClick={handleCreateClass}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Create
          </button>
          <button
            onClick={() => setIsCreating(false)}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="bg-primary text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Start New Class
        </button>
      )}
    </div>
  );
};
