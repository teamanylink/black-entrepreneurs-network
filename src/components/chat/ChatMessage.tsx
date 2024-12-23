import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { FileIcon } from "lucide-react";
import { ProfileCard } from "@/components/ProfileCard";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: string;
    timestamp: Date;
    isUser: boolean;
    attachment?: {
      url: string;
      name: string;
    };
  };
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", message.sender)
        .single();

      if (!error && data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [message.sender]);

  return (
    <div
      className={`flex ${
        message.isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[80%] ${
          message.isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {profile ? (
          <ProfileCard profile={profile}>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={profile.profile_image_url || ""} />
              <AvatarFallback>
                {[profile.first_name?.[0], profile.last_name?.[0]]
                  .filter(Boolean)
                  .join("")
                  .toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
          </ProfileCard>
        ) : (
          <Avatar className="h-8 w-8">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        )}
        <div
          className={`rounded-lg p-4 ${
            message.isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          <p className="text-sm">{message.content}</p>
          {message.attachment && (
            <a
              href={message.attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-2 text-sm hover:underline"
            >
              <FileIcon className="h-4 w-4" />
              {message.attachment.name}
            </a>
          )}
          <span className="text-xs opacity-70 mt-2 block">
            {format(message.timestamp, "p")}
          </span>
        </div>
      </div>
    </div>
  );
};