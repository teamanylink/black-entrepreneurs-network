import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send, Loader2, MessageSquare, Users, History } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isUser: boolean;
}

interface ChatThread {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread?: number;
}

const Chat = () => {
  const { session } = useAuth();
  const [activeChat, setActiveChat] = useState<"community" | string>("community");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "Assistant",
      timestamp: new Date(),
      isUser: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock chat threads data
  const chatThreads: ChatThread[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      lastMessage: "Thanks for the advice!",
      timestamp: new Date(),
      unread: 2,
    },
    {
      id: "2",
      name: "Michael Chen",
      lastMessage: "Let's connect soon",
      timestamp: new Date(),
    },
    {
      id: "3",
      name: "Lisa Williams",
      lastMessage: "Great opportunity!",
      timestamp: new Date(),
    },
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: session?.user?.email || "User",
      timestamp: new Date(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    // Simulate response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message. This is a demo response.",
        sender: "Assistant",
        timestamp: new Date(),
        isUser: false,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-6rem)]">
      {/* Side Panel */}
      <div className="w-80 border-r bg-muted/30">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Messages</h2>
        </div>
        <ScrollArea className="h-full">
          {/* Community Chat Button */}
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

          {/* Chat Threads */}
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

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            {activeChat === "community" ? "Community Chat" : "Direct Message"}
          </h2>
        </div>
        <div className="flex-1 relative">
          <ScrollArea className="h-full absolute inset-0 pr-4">
            <div className="space-y-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
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
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8" />
                    <div className="rounded-lg p-4 bg-muted">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;