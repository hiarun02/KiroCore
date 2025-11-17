"use client";

import {motion} from "framer-motion";
import {FooterProps} from "@/core/types/components";
import {footerVariants} from "@/core/lib/animations";

export function Footer({
  attribution = "Built with Kiro",
  links = [],
}: FooterProps) {
  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 z-40 h-12 backdrop-blur-md bg-zinc-950/80 border-t border-zinc-800"
      initial="hidden"
      animate="visible"
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4">
        <p className="text-sm text-zinc-400">{attribution}</p>

        {links.length > 0 && (
          <div className="flex items-center gap-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.footer>
  );
}
