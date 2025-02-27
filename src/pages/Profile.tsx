
import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/PageHeader";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { User, ImagePlus, UserPlus } from "lucide-react";

const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [teacherForm, setTeacherForm] = useState({
    teacherId: '',
    joinCode: ''
  });
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Here you would typically upload to your storage
      // For demo, we'll use a temporary URL
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would typically make an API call to add the teacher
      toast({
        title: "Success",
        description: "Teacher added successfully",
      });
      setTeacherForm({ teacherId: '', joinCode: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add teacher",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader 
          title="Profile" 
          description="Manage your profile and connected teachers"
        />

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Profile Picture</h3>
            <div className="flex items-center gap-6">
              <div className="relative">
                {profileImage ? (
                  <img 
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer hover:bg-primary-hover transition-colors">
                  <ImagePlus className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div>
                <h4 className="font-medium">Profile Picture</h4>
                <p className="text-sm text-gray-600">Upload a new profile picture</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Add Teacher</h3>
            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher ID
                </label>
                <input
                  type="text"
                  value={teacherForm.teacherId}
                  onChange={(e) => setTeacherForm(prev => ({ ...prev, teacherId: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter teacher ID"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Join Code
                </label>
                <input
                  type="text"
                  value={teacherForm.joinCode}
                  onChange={(e) => setTeacherForm(prev => ({ ...prev, joinCode: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter join code"
                  required
                />
              </div>
              <button type="submit" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors">
                <UserPlus className="w-4 h-4" />
                Add Teacher
              </button>
            </form>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Connected Teachers</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Dr. Smith</h4>
                  <p className="text-sm text-gray-600">Mathematics</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Connected
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Prof. Johnson</h4>
                  <p className="text-sm text-gray-600">Physics</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Connected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
