import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "./auth/AuthForm";
import { AuthHeader } from "./auth/AuthHeader";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunityId: string | null;
}

export function AuthDialog({ open, onOpenChange, opportunityId }: AuthDialogProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSuccess = (isNewUser: boolean) => {
    toast({
      title: "Success",
      description: isNewUser 
        ? "Account created successfully! Let's complete your profile."
        : "Successfully signed in",
    });
    onOpenChange(false);
    if (isNewUser) {
      navigate("/onboarding");
    } else {
      navigate("/dashboard/community");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <AuthHeader isSignUp={isSignUp} />
        <AuthForm 
          isSignUp={isSignUp} 
          setIsSignUp={setIsSignUp}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}