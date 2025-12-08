import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  locationKey: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const glitchOverlayVariants = {
  initial: { scaleX: 1 },
  animate: { 
    scaleX: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: { 
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function PageTransition({ children, locationKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen"
      >
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ 
            scaleX: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100] origin-left bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green pointer-events-none"
          style={{ transformOrigin: "left" }}
        />
        
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ 
            scaleX: 0,
            transition: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[99] origin-left bg-black pointer-events-none"
          style={{ transformOrigin: "left" }}
        />
        
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
