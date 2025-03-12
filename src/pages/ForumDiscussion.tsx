
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Message } from "@/types/forum";
import { MessageList } from "@/components/forum/MessageList";
import { MessageInput } from "@/components/forum/MessageInput";
import { sampleMessages, forumTitles } from "@/data/forumData";

const ForumDiscussion = () => {
  const { forumId } = useParams<{ forumId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId] = useState("current-user");
  const [userName] = useState("You");

  useEffect(() => {
    if (forumId && forumId in sampleMessages) {
      setMessages(sampleMessages[forumId]);
    }
  }, [forumId]);

  const handleSendMessage = (messageData: Omit<Message, 'id' | 'timestamp'>) => {
    if (!forumId) return;

    const message: Message = {
      ...messageData,
      id: messages.length + 1,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, message]);
  };

  if (!forumId || !(forumId in sampleMessages)) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card p-8 text-center">
            <h2 className="text-xl font-semibold">Forum not found</h2>
            <Button 
              className="mt-4" 
              onClick={() => navigate('/forum')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Forums
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/forum')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forums
        </Button>
        
        <PageHeader 
          title={forumTitles[forumId] || "Student Discussion"} 
          description="Collaborative learning with your peers"
        />
        
        <Card className="glass-card p-6 mt-6 h-[calc(100vh-300px)] flex flex-col">
          <MessageList 
            messages={messages} 
            currentUserId={userId} 
          />
          
          <MessageInput 
            onSendMessage={handleSendMessage}
            userId={userId}
            userName={userName}
          />
        </Card>
      </div>
    </div>
  );
};

export default ForumDiscussion;
