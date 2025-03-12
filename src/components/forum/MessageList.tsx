
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";
import { Message } from "@/types/forum";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.authorId === currentUserId ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[75%] rounded-lg p-3 ${
              message.authorId === currentUserId 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}
          >
            {message.authorId !== currentUserId && (
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
  );
};
