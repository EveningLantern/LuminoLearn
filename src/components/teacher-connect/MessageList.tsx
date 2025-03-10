
import { useEffect, useRef } from "react";
import { MessageItem } from "./MessageItem";

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

interface MessageListProps {
  messages: Message[];
  userId: string | null;
}

export const MessageList = ({ messages, userId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          id={message.id}
          senderId={message.senderId}
          senderName={message.senderName}
          content={message.content}
          timestamp={message.timestamp}
          isAI={message.isAI}
          userId={userId}
          attachment={message.attachment}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
