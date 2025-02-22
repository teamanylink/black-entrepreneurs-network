import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthDialog } from "@/components/AuthDialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [loading, setLoading] = useState(true);  // State to track loading
  const { session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Make sure to set loading to false after session is determined
    if (session !== undefined) {
      setLoading(false);
    }
  }, [session]);

  const handleLogout = async () => {
    try {
      console.log("Attempting to log out...");
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        throw error;
      }

      console.log("Logout successful");
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      });
      
      // Use replace to prevent going back to authenticated state
      navigate('/', { replace: true });
      
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again.",
      });
    }
  };

  if (loading) {
    // Optionally, you can show a loader here if desired.
    return null;
  }

  return (
    <nav className="bg-[#d19e57] shadow-sm">
      <div className=" mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-primary">B.E.N.</Link>
            <span className="hidden md:inline text-sm text-foreground">Business Empowerment Network</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {session ? (
              <Button 
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
            ) : (
              <Button 
                variant="default"
                onClick={() => setShowAuthDialog(true)}
              >
                Join Network
              </Button>
            )}
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <AuthDialog 
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        opportunityId={null}
      />
    </nav>
  );
};
