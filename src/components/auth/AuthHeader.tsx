import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AuthHeaderProps {
  isSignUp: boolean;
}

export function AuthHeader({ isSignUp }: AuthHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>{isSignUp ? "Sign up" : "Sign in"}</DialogTitle>
      <DialogDescription>
        {isSignUp
          ? "Create an account to join our community."
          : "Welcome back! Sign in to your account."}
      </DialogDescription>
    </DialogHeader>
  );
}