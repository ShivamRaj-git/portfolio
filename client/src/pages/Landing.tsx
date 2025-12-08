import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { ParticleScene } from "@/components/three/ParticleScene";
import { GlitchText } from "@/components/effects/GlitchText";
import { NeonButton } from "@/components/effects/NeonButton";

export default function Landing() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleScene />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="font-mono text-neon-cyan text-sm md:text-base uppercase tracking-[0.3em]">
            Creative Developer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider mb-6"
          data-testid="text-hero-title"
        >
          <GlitchText text="RAVE" className="neon-text-pink" />
          <span className="text-white">.</span>
          <span className="neon-text-cyan">DEV</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-sans"
          data-testid="text-hero-subtitle"
        >
          Building the future of the web with{" "}
          <span className="neon-text-green">immersive 3D experiences</span>,{" "}
          <span className="neon-text-pink">cutting-edge animations</span>, and{" "}
          <span className="neon-text-cyan">modern technologies</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/projects">
            <NeonButton variant="pink" size="lg" data-testid="button-enter-site">
              Enter the Rave
            </NeonButton>
          </Link>
          
          <Link href="/about">
            <NeonButton variant="cyan" size="lg" data-testid="button-about">
              About Me
            </NeonButton>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 md:mt-24"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="inline-flex flex-col items-center gap-2 text-white/50"
          >
            <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent" />

      <div className="absolute bottom-8 left-8 hidden lg:flex flex-col gap-4">
        {["GH", "TW", "LI"].map((social, index) => (
          <motion.div
            key={social}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="w-10 h-10 border border-white/20 rounded-md flex items-center justify-center text-white/50 font-mono text-xs cursor-pointer hover:border-neon-pink hover:text-neon-pink transition-colors"
          >
            {social}
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-8 hidden lg:block font-mono text-xs text-white/30"
      >
        2024
      </motion.div>
    </div>
  );
}
