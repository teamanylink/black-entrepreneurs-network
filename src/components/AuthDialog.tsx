import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthDialogForm } from "./auth/AuthDialogForm";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunityId: string | null;
}

export function AuthDialog({ open, onOpenChange, opportunityId }: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to B.E.N.</DialogTitle>
          <DialogDescription>
            Join our community to access opportunities and resources.
          </DialogDescription>
        </DialogHeader>
        <AuthDialogForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}