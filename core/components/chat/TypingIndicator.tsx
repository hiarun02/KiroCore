"use client";

import {motion} from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl" role="img" aria-label="AI assistant">
        👻
      </span>
      <div className="backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border bg-zinc-800/80 border-zinc-700/50">
        <div className="flex items-center gap-1">
          <motion.div
            className="w-2 h-2 bg-zinc-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="w-2 h-2 bg-zinc-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div
            className="w-2 h-2 bg-zinc-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </div>
  );
}
