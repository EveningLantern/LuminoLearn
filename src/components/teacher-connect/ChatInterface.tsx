
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { teachers, sampleChats } from "@/utils/teacherData";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, user } from "lucide-react";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isAI: boolean;
  attachment?: {
    name: string;
    type: string;
    url: string;
  };
}

export const ChatInterface = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [teacher, setTeacher] = useState<any>(null);
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserRole(user.user_metadata?.role || null);
        setUserId(user.id);
        setUserName(user.user_metadata?.name || null);
      }
    };
    
    getUserData();
    
    if (teacherId) {
      const foundTeacher = teachers.find(t => t.id === parseInt(teacherId));
      if (foundTeacher) {
        setTeacher(foundTeacher);
      }
    }
    
    const chatKey = `student-teacher-${teacherId}`;
    if (sampleChats[chatKey]) {
      setMessages(sampleChats[chatKey]);
    }
  }, [teacherId]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedFile) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      senderId: userId || "student-1",
      senderName: userName || "Student",
      content: newMessage,
      timestamp: new Date().toISOString(),
      isAI: false
    };
    
    if (selectedFile) {
      newMsg.attachment = {
        name: selectedFile.name,
        type: selectedFile.type.includes('image') ? 'image' : 'file',
        url: URL.createObjectURL(selectedFile)
      };
    }
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    setSelectedFile(null);
    
    if (userRole === "student") {
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          senderId: "ai",
          senderName: "AI Assistant",
          content: `I'm here to help with your question about ${teacher?.subject}. Your teacher, ${teacher?.name}, will respond to you soon.`,
          timestamp: new Date().toISOString(),
          isAI: true
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };
  
  const handleSubmitHomework = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Homework Submitted",
        description: "Your teacher will review it soon",
      });
      
      const systemMsg: Message = {
        id: messages.length + 1,
        senderId: "system",
        senderName: "System",
        content: `Homework submitted to ${teacher?.name}`,
        timestamp: new Date().toISOString(),
        isAI: false
      };
      setMessages([...messages, systemMsg]);
    }, 1500);
  };
  
  if (!teacher) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card p-8 text-center">
            <h2 className="text-xl font-semibold">Teacher not found</h2>
            <Button 
              className="mt-4" 
              onClick={() => navigate('/connect')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Teachers
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
          onClick={() => navigate('/connect')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Teachers
        </Button>
        
        <div className="flex items-center mb-6">
          <Avatar className="w-12 h-12 border-2 border-primary">
            <user className="w-8 h-8 text-primary" />
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{teacher?.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{teacher?.subject}</p>
          </div>
        </div>
        
        <Card className="glass-card p-4 h-[calc(100vh-250px)] flex flex-col">
          <MessageList messages={messages} userId={userId} />
          
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            handleSendMessage={handleSendMessage}
            userRole={userRole}
            isSubmitting={isSubmitting}
            handleSubmitHomework={handleSubmitHomework}
          />
        </Card>
      </div>
    </div>
  );
};
