
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Forum = () => {
  const navigate = useNavigate();

  const handleJoinDiscussion = (forumId: string) => {
    // Navigate to a sample group chat using the forum ID
    // This should be a separate group chat for students, not the teacher chat
    navigate(`/forum/discussion/${forumId}`);
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Discussion Forum" 
          description="Engage in subject discussions with peers and teachers"
        />
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Mathematics Forum</h3>
                <p className="text-gray-600">Discussion about calculus, algebra, and more</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span>156 discussions</span>
                  <Users className="w-4 h-4 ml-3 mr-1" />
                  <span>43 students</span>
                </div>
              </div>
              <Button 
                onClick={() => handleJoinDiscussion("math")}
                variant="default"
              >
                <Users className="mr-2 h-4 w-4" />
                Join Discussion
              </Button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Physics Forum</h3>
                <p className="text-gray-600">Topics in mechanics, thermodynamics, and more</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span>142 discussions</span>
                  <Users className="w-4 h-4 ml-3 mr-1" />
                  <span>38 students</span>
                </div>
              </div>
              <Button 
                onClick={() => handleJoinDiscussion("physics")}
                variant="default"
              >
                <Users className="mr-2 h-4 w-4" />
                Join Discussion
              </Button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Chemistry Forum</h3>
                <p className="text-gray-600">Discuss organic chemistry, reactions, and more</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span>128 discussions</span>
                  <Users className="w-4 h-4 ml-3 mr-1" />
                  <span>31 students</span>
                </div>
              </div>
              <Button 
                onClick={() => handleJoinDiscussion("chemistry")}
                variant="default"
              >
                <Users className="mr-2 h-4 w-4" />
                Join Discussion
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
