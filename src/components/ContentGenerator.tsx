import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ContentGeneratorProps {
  type: 'article' | 'blog';
}

export const ContentGenerator = ({ type }: ContentGeneratorProps) => {
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">
        {type === 'article' ? 'Article Generator' : 'Blog Post Generator'}
      </h1>
      <div className="space-y-4">
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
        <div className="mt-8 p-6 border rounded-lg bg-background">
          <h2 className="text-xl font-semibold mb-4">Generated Content:</h2>
          <div className="whitespace-pre-wrap">{generatedContent}</div>
        </div>
      )}
    </div>
  );
};