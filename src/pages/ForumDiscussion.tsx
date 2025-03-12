
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft, MessageSquare, User } from "lucide-react";
import { useState, useEffect } from "react";

interface Message {
  id: number;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
}

// Sample messages by forum ID
const sampleMessages: Record<string, Message[]> = {
  math: [
    {
      id: 1,
      authorId: "student-1",
      authorName: "Alex Thompson",
      content: "Can someone explain how to solve this calculus problem?",
      timestamp: "2023-06-15T10:30:00Z"
    },
    {
      id: 2,
      authorId: "student-2",
      authorName: "Jamie Wilson",
      content: "Sure! First, you need to find the derivative of the function...",
      timestamp: "2023-06-15T10:35:00Z"
    },
    {
      id: 3,
      authorId: "student-3",
      authorName: "Riley Chen",
      content: "I would also recommend looking at this example from chapter 4...",
      timestamp: "2023-06-15T10:40:00Z"
    }
  ],
  physics: [
    {
      id: 1,
      authorId: "student-4",
      authorName: "Morgan Lee",
      content: "I'm struggling with understanding the concept of angular momentum. Any tips?",
      timestamp: "2023-06-16T14:20:00Z"
    },
    {
      id: 2,
      authorId: "student-5",
      authorName: "Jordan Smith",
      content: "Think of it as the rotational equivalent of linear momentum. It's conserved in systems with no external torque.",
      timestamp: "2023-06-16T14:25:00Z"
    }
  ],
  chemistry: [
    {
      id: 1,
      authorId: "student-6",
      authorName: "Taylor Patel",
      content: "Can someone explain the difference between SN1 and SN2 reactions?",
      timestamp: "2023-06-17T09:10:00Z"
    },
    {
      id: 2,
      authorId: "student-2",
      authorName: "Jamie Wilson",
      content: "SN1 reactions happen in two steps with a carbocation intermediate, while SN2 reactions happen in one step with backside attack.",
      timestamp: "2023-06-17T09:15:00Z"
    }
  ]
};

// Forum titles by ID
const forumTitles: Record<string, string> = {
  math: "Mathematics Forum",
  physics: "Physics Forum",
  chemistry: "Chemistry Forum"
};

const ForumDiscussion = () => {
  const { forumId } = useParams<{ forumId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId] = useState("current-user");
  const [userName] = useState("You");

  useEffect(() => {
    if (forumId && forumId in sampleMessages) {
      setMessages(sampleMessages[forumId]);
    }
  }, [forumId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !forumId) return;

    const message: Message = {
      id: messages.length + 1,
      authorId: userId,
      authorName: userName,
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, message]);
    setNewMessage("");
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
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.authorId === userId ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] rounded-lg p-3 ${
                    message.authorId === userId 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  {message.authorId !== userId && (
                    <div className="flex items-center mb-1">
                      <Avatar className="w-5 h-5 mr-2">
                        <User className="w-3 h-3" />
                      </Avatar>
                      <span className="text-xs font-medium">{message.authorName}</span>
                    </div>
                  )}
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70 block text-right mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <Button type="submit">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForumDiscussion;
