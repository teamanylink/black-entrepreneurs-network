import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { AuthForm, AuthFormData } from "./auth/AuthForm";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunityId: string | null;
}

export function AuthDialog({ open, onOpenChange, opportunityId }: AuthDialogProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (formData: AuthFormData) => {
    console.log("Form submitted:", { isSignUp, email: formData.email }); // Debug log
    
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Passwords do not match",
        });
        return;
      }

      try {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            },
          },
        });

        console.log("Sign up response:", { data, error }); // Debug log

        if (error) {
          toast({
            variant: "destructive",
            title: "Sign up failed",
            description: error.message,
          });
        } else {
          toast({
            title: "Success",
            description: "Account created successfully! Please complete your profile.",
          });
          onOpenChange(false);
          navigate("/onboarding");
        }
      } catch (err) {
        console.error("Sign up error:", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred during sign up",
        });
      }
    } else {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        console.log("Sign in response:", { data, error }); // Debug log

        if (error) {
          let errorMessage = "Invalid email or password";
          if (error.message.includes("Email not confirmed")) {
            errorMessage = "Please confirm your email address before signing in";
          }
          toast({
            variant: "destructive",
            title: "Sign in failed",
            description: errorMessage,
          });
        } else {
          toast({
            title: "Success",
            description: "Successfully signed in",
          });
          onOpenChange(false);
          navigate("/dashboard/community");
        }
      } catch (err) {
        console.error("Sign in error:", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred during sign in",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignUp ? "Sign up" : "Sign in"}</DialogTitle>
          <DialogDescription>
            {isSignUp
              ? "Create an account to join our community."
              : "Welcome back! Sign in to your account."}
          </DialogDescription>
        </DialogHeader>
        <AuthForm
          isSignUp={isSignUp}
          onSubmit={handleSubmit}
          onToggleMode={() => setIsSignUp(!isSignUp)}
        />
      </DialogContent>
    </Dialog>
  );
}