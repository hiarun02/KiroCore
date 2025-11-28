"use client";

import {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

export function KiroStatus() {
  const [status, setStatus] = useState<
    "checking" | "available" | "unavailable"
  >("checking");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    checkKiroStatus();
  }, []);

  const checkKiroStatus = async () => {
    setStatus("checking");
    try {
      const {checkKiroStatus: checkStatus} = await import(
        "@/core/services/api"
      );
      const result = await checkStatus();
      setStatus(result.available ? "available" : "unavailable");
    } catch (error) {
      setStatus("unavailable");
    }
  };

  const statusConfig = {
    checking: {
      icon: "⏳",
      text: "Checking Kiro CLI...",
      color: "text-yellow-400",
      bg: "bg-yellow-900/20",
      border: "border-yellow-800/50",
    },
    available: {
      icon: "🔮",
      text: "Kiro CLI Active",
      color: "text-primary",
      bg: "bg-primary/20",
      border: "border-primary/50",
    },
    unavailable: {
      icon: "💭",
      text: "Fallback Mode",
      color: "text-zinc-400",
      bg: "bg-zinc-800/50",
      border: "border-zinc-700/50",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="relative">
      <motion.button
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.border} ${config.color} text-xs font-medium transition-all hover:scale-105`}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        onClick={checkKiroStatus}
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
      >
        <span>{config.icon}</span>
        <span className="hidden sm:inline">{config.text}</span>
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{opacity: 0, y: 5}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 5}}
            className="absolute top-full mt-2 right-0 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-300 whitespace-nowrap shadow-lg z-50"
          >
            {status === "available" && (
              <p>Kiro CLI is running. Full features enabled.</p>
            )}
            {status === "unavailable" && (
              <p>Kiro CLI not detected. Using fallback responses.</p>
            )}
            {status === "checking" && <p>Checking Kiro CLI status...</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
