import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { AuthDialog } from "@/components/AuthDialog";

export const Hero = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  return (
    <div className="bg-gradient-to-br from-primary to-accent py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Empowering Black Entrepreneurs
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join a thriving community of professionals, share ideas, and grow your business with B.E.N. - your gateway to success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="font-semibold"
              onClick={() => setShowAuthDialog(true)}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <AuthDialog 
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        opportunityId={null}
      />
    </div>
  );
};