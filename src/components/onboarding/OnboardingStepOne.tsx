import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OnboardingStepOneProps {
  onComplete: () => void;
}

export const OnboardingStepOne = ({ onComplete }: OnboardingStepOneProps) => {
  const [isBusinessOwner, setIsBusinessOwner] = useState<boolean | null>(null);
  const [businessDescription, setBusinessDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        business_owner: isBusinessOwner,
        business_description: isBusinessOwner ? businessDescription : null,
      })
      .eq("id", user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your information. Please try again.",
      });
      return;
    }

    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Are you a business owner?</Label>
        <RadioGroup
          value={isBusinessOwner?.toString()}
          onValueChange={(value) => setIsBusinessOwner(value === "true")}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="business-yes" />
            <Label htmlFor="business-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="business-no" />
            <Label htmlFor="business-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {isBusinessOwner && (
        <div className="space-y-2">
          <Label htmlFor="business-description">
            Tell us about your business
          </Label>
          <Textarea
            id="business-description"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            placeholder="What does your business do? What are your goals?"
            required
          />
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isBusinessOwner === null}
      >
        Continue
      </Button>
    </form>
  );
};