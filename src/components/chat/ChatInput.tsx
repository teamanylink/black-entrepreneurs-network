import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ChatInputProps {
  onSendMessage: (content: string, attachment?: { url: string; name: string }) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !isUploading) return;

    onSendMessage(newMessage);
    setNewMessage("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('chat_attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('chat_attachments')
        .getPublicUrl(filePath);

      onSendMessage(
        newMessage || "Sent an attachment",
        { url: publicUrl, name: file.name }
      );
      setNewMessage("");
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
          disabled={isLoading || isUploading}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading || isUploading}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button type="submit" size="icon" disabled={isLoading || isUploading}>
          {isLoading || isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </form>
  );
};