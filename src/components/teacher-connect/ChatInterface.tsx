
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { teachers, sampleChats } from "@/utils/teacherData";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { Send, Paperclip, Image, ArrowLeft, Bot, File } from "lucide-react";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [teacher, setTeacher] = useState<any>(null);
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    
    // Find the teacher data
    if (teacherId) {
      const foundTeacher = teachers.find(t => t.id === parseInt(teacherId));
      if (foundTeacher) {
        setTeacher(foundTeacher);
      }
    }
    
    // Load sample chat history
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
    
    // Simulate AI assistant response
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
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      toast({
        title: "File selected",
        description: `${e.target.files[0].name} ready to send`,
      });
    }
  };
  
  const handleFileButtonClick = (type: 'image' | 'file') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : '.pdf,.doc,.docx,.txt,.zip';
      fileInputRef.current.click();
    }
  };

  const handleSubmitHomework = () => {
    setIsSubmitting(true);
    
    // Simulate file submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Homework Submitted",
        description: "Your teacher will review it soon",
      });
      
      // Add a system message about the submission
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
          <Avatar className="w-12 h-12 border-2 border-primary mr-4">
            <img src={teacher.image} alt={teacher.name} />
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{teacher.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{teacher.subject}</p>
          </div>
        </div>
        
        <Card className="glass-card p-4 h-[calc(100vh-250px)] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.isAI ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 border' : 
                  message.senderId === userId ? 'bg-primary/10 border-primary/20 border' : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {message.isAI && <Bot className="w-4 h-4 text-blue-500" />}
                    <span className="font-medium text-sm">{message.senderName}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {message.attachment && (
                    <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                      {message.attachment.type === 'image' ? (
                        <div>
                          <img 
                            src={message.attachment.url} 
                            alt="Attachment" 
                            className="max-h-40 rounded"
                          />
                          <p className="text-xs mt-1 text-gray-500">{message.attachment.name}</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <File className="w-5 h-5 text-primary" />
                          <span className="text-sm">{message.attachment.name}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {selectedFile && (
            <div className="p-2 mb-2 bg-primary/5 rounded-md flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm">
                {selectedFile.type.includes('image') ? (
                  <Image className="w-4 h-4" />
                ) : (
                  <File className="w-4 h-4" />
                )}
                <span className="truncate max-w-[200px]">{selectedFile.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedFile(null)}
              >
                Remove
              </Button>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleFileButtonClick('file')}
              title="Attach File"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleFileButtonClick('image')}
              title="Attach Image"
            >
              <Image className="h-4 w-4" />
            </Button>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
            />
            
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {userRole === "student" && (
            <div className="mt-4 text-center">
              <Button 
                onClick={handleSubmitHomework}
                disabled={isSubmitting}
                variant="outline"
                className="w-full"
              >
                {isSubmitting ? "Submitting..." : "Submit Homework"}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
