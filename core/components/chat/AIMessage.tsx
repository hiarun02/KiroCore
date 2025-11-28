"use client";

import {motion} from "framer-motion";
import {MessageProps} from "@/core/types/components";
import {messageVariants} from "@/core/lib/animations";

export function AIMessage({content, timestamp, source, error}: MessageProps) {
  // Format content with code blocks
  const formatContent = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```|`[^`]+`)/g);

    return parts.map((part, index) => {
      // Multi-line code block
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part.slice(3, -3).trim();
        return (
          <pre
            key={index}
            className="bg-zinc-900 rounded-lg p-3 my-2 overflow-x-auto border border-zinc-700"
          >
            <code className="text-xs text-zinc-300 font-mono">{code}</code>
          </pre>
        );
      }
      // Inline code
      if (part.startsWith("`") && part.endsWith("`")) {
        const code = part.slice(1, -1);
        return (
          <code
            key={index}
            className="bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono text-primary"
          >
            {code}
          </code>
        );
      }
      // Regular text
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.div
      className="flex items-start gap-3"
      initial="hidden"
      animate="visible"
      variants={messageVariants}
    >
      <span className="text-2xl" role="img" aria-label="AI assistant">
        👻
      </span>
      <div className="flex-1 max-w-[80%]">
        <div
          className={`backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border ${
            error
              ? "bg-red-900/20 border-red-800/50"
              : "bg-zinc-800/80 border-zinc-700/50"
          }`}
        >
          <div className="text-sm text-zinc-100 whitespace-pre-wrap leading-relaxed">
            {formatContent(content)}
          </div>
          <div className="flex items-center justify-between mt-2 gap-2">
            <time className="text-xs text-zinc-500">
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
            {source && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  source === "kiro-cli"
                    ? "bg-primary/20 text-primary"
                    : "bg-zinc-700/50 text-zinc-400"
                }`}
                title={
                  source === "kiro-cli"
                    ? "Powered by Kiro CLI"
                    : "Fallback response"
                }
              >
                {source === "kiro-cli" ? "🔮 Kiro" : "💭 Fallback"}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
