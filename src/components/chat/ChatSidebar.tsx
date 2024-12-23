import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Users, History } from "lucide-react";

interface ChatThread {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread?: number;
}

interface ChatSidebarProps {
  activeChat: "community" | string;
  setActiveChat: (chat: "community" | string) => void;
  chatThreads: ChatThread[];
}

export const ChatSidebar = ({ activeChat, setActiveChat, chatThreads }: ChatSidebarProps) => {
  return (
    <div className="w-80 border-r bg-muted/30">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Messages</h2>
      </div>
      <ScrollArea className="h-full">
        <Button
          variant={activeChat === "community" ? "secondary" : "ghost"}
          className="w-full justify-start gap-2 p-4"
          onClick={() => setActiveChat("community")}
        >
          <Users className="h-4 w-4" />
          <span>Community Chat</span>
        </Button>

        <div className="px-4 py-2">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <History className="h-4 w-4" />
            Recent Messages
          </h3>
        </div>

        <div className="space-y-2 p-2">
          {chatThreads.map((thread) => (
            <Button
              key={thread.id}
              variant={activeChat === thread.id ? "secondary" : "ghost"}
              className="w-full justify-start p-3 h-auto"
              onClick={() => setActiveChat(thread.id)}
            >
              <div className="flex items-start gap-3 w-full">
                <Avatar className="h-8 w-8" />
                <div className="flex-1 space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">
                      {thread.name}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {thread.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {thread.lastMessage}
                  </p>
                </div>
                {thread.unread && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {thread.unread}
                  </span>
                )}
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};