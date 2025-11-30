"use client";

import {useState, useEffect} from "react";
import {Message} from "@/core/types/message";
import {MessageList} from "./MessageList";
import {MessageInput} from "./MessageInput";
import {EmptyState} from "./EmptyState";
import {sendChatMessage} from "@/core/services/api";
import {
  getActiveConversationId,
  createNewConversation,
  saveCurrentConversation,
  loadConversation,
} from "@/core/services/conversationHistory";

interface ChatAreaProps {
  welcomeMessage: string;
  appIcon?: string;
  sidebarOpen?: boolean;
  appType?: string;
  conversationId?: string;
}

export function ChatArea({
  welcomeMessage,
  appIcon,
  appType = "study-buddy",
  conversationId,
}: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentConversationId, setCurrentConversationId] =
    useState<string>("");

  useEffect(() => {
    let convId: string;

    if (conversationId === "new") {
      convId = createNewConversation(appType);
    } else if (conversationId) {
      convId = conversationId;
    } else {
      convId =
        getActiveConversationId(appType) || createNewConversation(appType);
    }

    setCurrentConversationId(convId);
    setMessages(loadConversation(appType, convId));
  }, [appType, conversationId]);

  useEffect(() => {
    if (messages.length > 0 && currentConversationId) {
      saveCurrentConversation(appType, currentConversationId, messages);
    }
  }, [messages, appType, currentConversationId]);

  const handleSendMessage = async (content: string) => {
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        message: content,
        appType,
        conversationHistory: messages,
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
        source: response.source as "kiro-cli" | "fallback",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setError("Failed to get response. Please try again.");

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting. Please try again.",
        timestamp: new Date(),
        error: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col flex-1 overflow-hidden">
      {/* Messages Area - scrollable */}
      <div className="flex-1 overflow-y-auto flex justify-center scrollbar-hide">
        <div className="w-full max-w-4xl px-2 sm:px-4 py-6 flex flex-col">
          {messages.length === 0 ? (
            <EmptyState welcomeMessage={welcomeMessage} appIcon={appIcon} />
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="shrink-0 bg-red-900/20 border-t border-red-800 px-4 py-2">
          <div className="max-w-4xl mx-auto">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Input Area - fixed at bottom */}
      <div className="shrink-0 border-t border-zinc-800 bg-zinc-950 py-4">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
          <MessageInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </main>
  );
}
