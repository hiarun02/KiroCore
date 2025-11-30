"use client";

import {useEffect, useRef} from "react";
import {Message} from "@/core/types/message";
import {UserMessage} from "./UserMessage";
import {AIMessage} from "./AIMessage";
import {TypingIndicator} from "./TypingIndicator";

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export function MessageList({messages, isLoading}: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6 space-y-4"
    >
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
          />
        ) : (
          <AIMessage
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
            source={message.source}
            error={message.error}
          />
        )
      )}

      {isLoading && <TypingIndicator />}
    </div>
  );
}
