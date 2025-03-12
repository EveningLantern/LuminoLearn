
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Message } from "@/types/forum";

interface MessageInputProps {
  onSendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  userId: string;
  userName: string;
}

export const MessageInput = ({ onSendMessage, userId, userName }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    onSendMessage({
      authorId: userId,
      authorName: userName,
      content: newMessage
    });

    setNewMessage("");
    toast.success("Message sent successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
      />
      <Button type="submit" disabled={!newMessage.trim()}>
        <MessageSquare className="mr-2 h-4 w-4" />
        Send
      </Button>
    </form>
  );
};
