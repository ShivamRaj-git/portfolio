import { motion } from "framer-motion";
import { Link } from "wouter";
import { NeonButton } from "@/components/effects/NeonButton";
import { GlitchText } from "@/components/effects/GlitchText";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-8xl md:text-9xl tracking-wider mb-4">
            <GlitchText text="404" className="neon-text-pink" />
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-display text-3xl md:text-4xl tracking-wider text-white mb-4">
            SIGNAL LOST
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for has vanished into the void.
            Let's get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/">
            <NeonButton variant="cyan" size="lg" data-testid="button-go-home">
              Return to Base
            </NeonButton>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 text-white/30 font-mono text-sm"
        >
          ERROR_CODE: PAGE_NOT_FOUND
        </motion.div>
      </div>
    </div>
  );
}
