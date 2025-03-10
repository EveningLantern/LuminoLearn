
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, ImageIcon } from "lucide-react";
import { AttachmentPreview } from "./AttachmentPreview";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  handleSendMessage: () => void;
  userRole: "student" | "teacher" | null;
  isSubmitting: boolean;
  handleSubmitHomework: () => void;
}

export const ChatInput = ({
  newMessage,
  setNewMessage,
  selectedFile,
  setSelectedFile,
  handleSendMessage,
  userRole,
  isSubmitting,
  handleSubmitHomework
}: ChatInputProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  return (
    <>
      {selectedFile && (
        <AttachmentPreview 
          file={selectedFile} 
          onRemove={() => setSelectedFile(null)} 
        />
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
          <ImageIcon className="h-4 w-4" />
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
    </>
  );
};
