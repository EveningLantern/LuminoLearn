
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TeacherCardProps {
  id: number;
  name: string;
  subject: string;
  image: string;
  description: string;
}

export const TeacherCard = ({ id, name, subject, image, description }: TeacherCardProps) => {
  const navigate = useNavigate();
  
  const handleStartChat = () => {
    navigate(`/connect/chat/${id}`);
  };

  return (
    <Card className="glass-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="w-16 h-16 border-2 border-primary">
          <img src={image} alt={name} className="object-cover" />
        </Avatar>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{subject}</p>
          <p className="mt-2 text-sm line-clamp-2">{description}</p>
        </div>
        <Button 
          onClick={handleStartChat}
          className="mt-4 sm:mt-0"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat Now
        </Button>
      </div>
    </Card>
  );
};
