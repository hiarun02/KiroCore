"use client";

import {motion} from "framer-motion";
import {HeaderProps} from "@/core/types/components";
import {headerVariants} from "@/core/lib/animations";

export function Header({appName, appIcon = "👻"}: HeaderProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800 shadow-[0_1px_0_0_rgba(139,92,246,0.2)]"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="App icon">
            {appIcon}
          </span>
          <h1 className="text-xl font-semibold text-zinc-100">{appName}</h1>
        </div>
      </div>
    </motion.header>
  );
}
