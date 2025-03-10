
import { Avatar } from "@/components/ui/avatar";
import { File, bot, user, userRound } from "lucide-react";

interface Attachment {
  name: string;
  type: string;
  url: string;
}

interface MessageItemProps {
  id: number;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isAI: boolean;
  userId: string | null;
  attachment?: Attachment;
}

export const MessageItem = ({
  senderId,
  senderName,
  content,
  timestamp,
  isAI,
  userId,
  attachment
}: MessageItemProps) => {
  const getAvatar = (isAI: boolean, senderId: string) => {
    if (isAI) return <bot className="text-blue-500" />;
    if (senderId === userId) return <userRound className="text-primary" />;
    return <user className="text-secondary" />;
  };

  return (
    <div className={`flex ${senderId === userId ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-lg p-3 ${
        isAI ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 border' : 
        senderId === userId ? 'bg-primary/10 border-primary/20 border' : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <Avatar className="w-6 h-6">
            {getAvatar(isAI, senderId)}
          </Avatar>
          <span className="font-medium text-sm">{senderName}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <p className="whitespace-pre-wrap ml-8">{content}</p>
        
        {attachment && (
          <div className="mt-2 ml-8 p-2 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            {attachment.type === 'image' ? (
              <div>
                <img 
                  src={attachment.url} 
                  alt="Attachment" 
                  className="max-h-40 rounded"
                />
                <p className="text-xs mt-1 text-gray-500">{attachment.name}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <File className="w-5 h-5 text-primary" />
                <span className="text-sm">{attachment.name}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
