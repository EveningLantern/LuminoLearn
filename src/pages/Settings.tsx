
import { useState } from 'react';
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Moon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleResetAccount = async () => {
    if (window.confirm('Are you sure you want to reset your account data? This cannot be undone.')) {
      try {
        // Here you would typically make an API call to reset the account
        toast({
          title: "Success",
          description: "Account data has been reset",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to reset account data",
          variant: "destructive",
        });
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: "Theme Updated",
      description: `Switched to ${isDarkMode ? 'light' : 'dark'} mode`,
    });
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader 
          title="Settings" 
          description="Customize your account preferences"
        />

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5" />
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-gray-600">Toggle dark mode with blue glow</p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`w-12 h-6 rounded-full transition-colors ${
                  isDarkMode ? 'bg-primary' : 'bg-gray-200'
                } relative`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    isDarkMode ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-red-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Danger Zone
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Reset Account Data</h4>
                <p className="text-sm text-gray-600">
                  This will permanently erase all your data
                </p>
              </div>
              <button
                onClick={handleResetAccount}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Reset Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
