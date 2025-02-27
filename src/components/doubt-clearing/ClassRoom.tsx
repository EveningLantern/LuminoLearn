
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClassRoomProps {
  classId: string;
  onLeaveClass: () => void;
  userRole: "student" | "teacher" | null;
}

const generateRandomName = () => {
  const adjectives = ["Happy", "Quick", "Clever", "Bright", "Wise"];
  const nouns = ["Dolphin", "Eagle", "Lion", "Fox", "Bear"];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;
};

export const ClassRoom = ({ classId, onLeaveClass, userRole }: ClassRoomProps) => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
  }>>([]);
  const [newMessage, setNewMessage] = useState("");
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [randomName] = useState(generateRandomName());
  const [messageDelay, setMessageDelay] = useState(5000); // 5 seconds default
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const now = Date.now();
    if (userRole === "student" && now - lastMessageTime < messageDelay) {
      toast({
        title: "Error",
        description: `Please wait ${messageDelay / 1000} seconds between messages`,
        variant: "destructive",
      });
      return;
    }

    const message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: userRole === "teacher" ? "Teacher" : randomName,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
    setLastMessageTime(now);
  };

  const handleReportUser = (userName: string) => {
    toast({
      title: "User Reported",
      description: `${userName} has been reported and blocked from this class`,
    });
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="flex justify-between items-center mb-4 p-4 glass-card">
        <div className="flex items-center">
          <button onClick={onLeaveClass} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-semibold">Mathematics Advanced</h2>
            <p className="text-sm text-gray-600">Dr. Smith</p>
          </div>
        </div>
        {userRole === "teacher" && (
          <div className="flex gap-4">
            <input
              type="number"
              min="5"
              max="120"
              value={messageDelay / 1000}
              onChange={(e) => setMessageDelay(Number(e.target.value) * 1000)}
              className="w-20 px-2 py-1 border rounded"
            />
            <button
              onClick={() => {
                setMessages([]);
                onLeaveClass();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              End Class
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex items-start gap-2"
          >
            <div className={`flex-1 ${
              message.sender === "Teacher" ? "bg-blue-50" : "bg-gray-50"
            } rounded-lg p-3`}>
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold">{message.sender}</span>
                {userRole === "teacher" && message.sender !== "Teacher" && (
                  <button
                    onClick={() => handleReportUser(message.sender)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <AlertCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p>{message.text}</p>
              <span className="text-xs text-gray-500">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 glass-card">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
