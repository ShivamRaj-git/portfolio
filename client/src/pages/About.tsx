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
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            I'm Shivam Kumar, a software developer in the making, passionate about building clean, usable and efficient applications. I enjoy understanding how systems work from end-to-end – from the database and APIs to the animations and user experience.
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
              MY JOURNEY
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              My journey started with C, C++ and Java basics in college, and then moved into web development, Python and data handling. I've worked on projects like a Medicine Distribution Management System (DAWAI NOW), a To-Do List app, and an EMI Calculator, which helped me understand real-world problem solving, database design and UI/UX.
            </p>
            <p className="text-white/80 leading-relaxed">
              Right now I'm focusing on improving my DSA, building full-stack projects, and exploring modern tools like Next.js, TypeScript and three.js to create immersive experiences on the web.
            </p>
          </div>

          <div className="glass-card rounded-md p-8">
            <h2 className="font-display text-3xl tracking-wider neon-text-green mb-6">
              BEYOND CODE
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              When I'm not coding, you'll probably find me exploring new tech, listening to music, or planning my next side project.
            </p>
            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-neon-pink mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Problem Solving</h3>
                  <p className="text-white/60 text-sm">Understanding systems from database to UI</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Continuous Learning</h3>
                  <p className="text-white/60 text-sm">Always exploring new technologies and tools</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-neon-green mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Full-Stack Focus</h3>
                  <p className="text-white/60 text-sm">Building complete applications end-to-end</p>
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
