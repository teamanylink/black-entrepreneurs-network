import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { OnboardingStepOne } from "@/components/onboarding/OnboardingStepOne";
import { OnboardingStepTwo } from "@/components/onboarding/OnboardingStepTwo";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStepOneComplete = () => {
    setStep(2);
  };

  const handleStepTwoComplete = () => {
    toast({
      title: "Profile created successfully!",
      description: "You can now start exploring opportunities.",
    });
    navigate("/opportunities");
  };

  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome to B.E.N.</h1>
          <p className="text-muted-foreground">
            Let's set up your profile to get started
          </p>
        </div>

        {step === 1 ? (
          <OnboardingStepOne onComplete={handleStepOneComplete} />
        ) : (
          <OnboardingStepTwo onComplete={handleStepTwoComplete} />
        )}
      </div>
    </div>
  );
};

export default Onboarding;