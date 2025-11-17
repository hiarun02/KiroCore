// Framer Motion animation variants

export const messageVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.3},
  },
};

export const headerVariants = {
  hidden: {y: -100},
  visible: {
    y: 0,
    transition: {type: "spring" as const, stiffness: 100},
  },
};

export const footerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {duration: 0.5, delay: 0.2},
  },
};

export const toggleVariants = {
  haunt: {rotate: 0},
  human: {
    rotate: 180,
    transition: {duration: 0.5},
  },
};

export const glowVariants = {
  idle: {boxShadow: "0 0 0px rgba(139, 92, 246, 0)"},
  active: {
    boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
    transition: {duration: 0.3},
  },
};

export const emptyStateVariants = {
  hidden: {opacity: 0, scale: 0.9},
  visible: {
    opacity: 0.6,
    scale: 1,
    transition: {duration: 0.5},
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {duration: 0.3},
  },
};

export const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
