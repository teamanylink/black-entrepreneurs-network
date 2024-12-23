import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatInput } from "@/components/chat/ChatInput";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isUser: boolean;
  attachment?: {
    url: string;
    name: string;
  };
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

  const handleSendMessage = async (content: string, attachment?: { url: string; name: string }) => {
    if (!content.trim() && !attachment) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: session?.user?.email || "User",
      timestamp: new Date(),
      isUser: true,
      attachment,
    };

    setMessages((prev) => [...prev, userMessage]);
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
      <ChatSidebar
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        chatThreads={chatThreads}
      />

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
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>
        </div>

        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Chat;