import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContentGeneratorDialogProps {
  type: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContentGeneratorDialog({ type, open, onOpenChange }: ContentGeneratorDialogProps) {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic or prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-article', {
        body: { prompt, type },
      });

      if (error) throw error;

      setGeneratedContent(data.content);
      toast({
        title: "Success",
        description: `Your ${type} has been generated!`,
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {type} Generator
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 flex-shrink-0">
          <Textarea
            placeholder={`Enter your ${type} topic or prompt...`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              `Generate ${type}`
            )}
          </Button>
        </div>
        
        {generatedContent && (
          <ScrollArea className="flex-1 mt-8">
            <div className="p-6 border rounded-lg bg-background">
              <h2 className="text-xl font-semibold mb-4">Generated Content:</h2>
              <div className="whitespace-pre-wrap">{generatedContent}</div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}