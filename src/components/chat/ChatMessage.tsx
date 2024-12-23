import { Avatar } from "@/components/ui/avatar";
import { format } from "date-fns";
import { FileIcon } from "lucide-react";

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
        <Avatar className="h-8 w-8" />
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