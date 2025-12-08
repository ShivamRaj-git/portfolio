import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { TimelineCard } from "@/components/cards/TimelineCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { TimelineItem } from "@shared/schema";

export default function About() {
  const { data: timelineItems, isLoading } = useQuery<TimelineItem[]>({
    queryKey: ["/api/timeline"],
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-neon-cyan text-sm uppercase tracking-[0.3em] mb-4 block">
            Who I Am
          </span>
          <h1 
            className="font-display text-5xl md:text-7xl tracking-wider neon-text-pink mb-6"
            data-testid="text-about-title"
          >
            ABOUT ME
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            I'm a creative developer passionate about pushing the boundaries of web experiences.
            I blend code with creativity to build immersive digital worlds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-24"
        >
          <div className="glass-card rounded-md p-8">
            <h2 className="font-display text-3xl tracking-wider neon-text-cyan mb-6">
              PHILOSOPHY
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              I believe that the web should be an experience, not just a destination. 
              Every pixel, every animation, every interaction should tell a story and 
              evoke emotion.
            </p>
            <p className="text-white/80 leading-relaxed">
              My approach combines technical excellence with artistic vision, creating 
              digital experiences that are both functional and unforgettable.
            </p>
          </div>

          <div className="glass-card rounded-md p-8">
            <h2 className="font-display text-3xl tracking-wider neon-text-green mb-6">
              APPROACH
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-neon-pink mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Performance First</h3>
                  <p className="text-white/60 text-sm">Optimized code that runs smoothly on all devices</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">User-Centered</h3>
                  <p className="text-white/60 text-sm">Intuitive interfaces that delight and engage</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-neon-green mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Future-Ready</h3>
                  <p className="text-white/60 text-sm">Cutting-edge tech that stays ahead of the curve</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <span className="font-mono text-neon-green text-sm uppercase tracking-[0.3em] mb-4 block">
              My Journey
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-wider text-white">
              TIMELINE
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-neon-pink via-neon-cyan to-neon-green opacity-50 hidden md:block" />

            {isLoading && (
              <div className="space-y-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-8">
                    <Skeleton className="h-32 flex-1 rounded-md bg-white/5" />
                    <div className="w-4 h-4 rounded-full bg-white/10" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            )}

            {timelineItems && (
              <div className="space-y-8">
                {timelineItems.map((item, index) => (
                  <TimelineCard 
                    key={item.id} 
                    item={item} 
                    index={index}
                    isLeft={index % 2 === 0}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
