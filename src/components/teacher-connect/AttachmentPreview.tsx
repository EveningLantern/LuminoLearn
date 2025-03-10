
import { Button } from "@/components/ui/button";
import { File, ImageIcon } from "lucide-react";

interface AttachmentPreviewProps {
  file: File;
  onRemove: () => void;
}

export const AttachmentPreview = ({ file, onRemove }: AttachmentPreviewProps) => {
  return (
    <div className="p-2 mb-2 bg-primary/5 rounded-md flex justify-between items-center">
      <div className="flex items-center gap-2 text-sm">
        {file.type.includes('image') ? (
          <ImageIcon className="w-4 h-4" />
        ) : (
          <File className="w-4 h-4" />
        )}
        <span className="truncate max-w-[200px]">{file.name}</span>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onRemove}
      >
        Remove
      </Button>
    </div>
  );
};
