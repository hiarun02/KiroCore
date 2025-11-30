"use client";

import {motion} from "framer-motion";
import {EmptyStateProps} from "@/core/types/components";
import {emptyStateVariants, floatingAnimation} from "@/core/lib/animations";
import {DynamicIcon} from "@/core/lib/icons";

export function EmptyState({welcomeMessage, appIcon = "👻"}: EmptyStateProps) {
  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center px-4 py-12"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={emptyStateVariants}
    >
      <motion.div className="mb-6" animate={floatingAnimation}>
        <DynamicIcon icon={appIcon} size={96} className="text-8xl" />
      </motion.div>

      <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 mb-2 text-center px-4">
        {welcomeMessage}
      </h2>

      <p className="text-sm sm:text-base text-zinc-400 text-center max-w-md mx-auto px-4">
        Type a message below to start chatting 💀
      </p>
    </motion.div>
  );
}
