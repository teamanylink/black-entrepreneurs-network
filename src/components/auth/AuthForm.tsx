import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthFormProps {
  isSignUp: boolean;
  setIsSignUp: (isSignUp: boolean) => void;
  onSuccess: (isNewUser: boolean) => void;
}

export function AuthForm({ isSignUp, setIsSignUp, onSuccess }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          onSuccess(true);
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
          onSuccess(false);
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignUp && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>
      {isSignUp && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      )}
      <Button type="submit" className="w-full">
        {isSignUp ? "Sign up" : "Sign in"}
      </Button>
      <p className="text-center text-sm text-gray-500">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-primary hover:underline"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </button>
      </p>
    </form>
  );
}