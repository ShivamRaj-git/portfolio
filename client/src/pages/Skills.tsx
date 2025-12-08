import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { SkillCard } from "@/components/cards/SkillCard";
import { SkillSphere } from "@/components/three/SkillSphere";
import { Skeleton } from "@/components/ui/skeleton";
import type { Skill } from "@shared/schema";

const categories = [
  { key: "frontend", label: "Frontend", color: "#FF10F0" },
  { key: "backend", label: "Backend", color: "#00D9FF" },
  { key: "tools", label: "Tools", color: "#39FF14" },
  { key: "design", label: "Design", color: "#8B00FF" },
] as const;

export default function Skills() {
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-neon-green text-sm uppercase tracking-[0.3em] mb-4 block">
            What I Do
          </span>
          <h1 
            className="font-display text-5xl md:text-7xl tracking-wider neon-text-cyan mb-6"
            data-testid="text-skills-title"
          >
            SKILLS
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            A collection of technologies and tools I've mastered over the years.
            Always learning, always growing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
              {categories.map((cat) => (
                <div
                  key={cat.key}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border"
                  style={{ 
                    borderColor: `${cat.color}50`,
                    backgroundColor: `${cat.color}10`,
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span 
                    className="font-mono text-sm"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>

            {isLoading && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-md bg-white/5" />
                ))}
              </div>
            )}

            {skills && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="order-1 lg:order-2 h-[300px] md:h-[400px] lg:h-[500px]"
          >
            <SkillSphere />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="glass-card rounded-md p-6 text-center">
            <div className="font-display text-5xl neon-text-pink mb-2">5+</div>
            <div className="text-white/70 font-mono text-sm uppercase tracking-wider">Years Experience</div>
          </div>
          <div className="glass-card rounded-md p-6 text-center">
            <div className="font-display text-5xl neon-text-cyan mb-2">50+</div>
            <div className="text-white/70 font-mono text-sm uppercase tracking-wider">Projects Completed</div>
          </div>
          <div className="glass-card rounded-md p-6 text-center">
            <div className="font-display text-5xl neon-text-green mb-2">15+</div>
            <div className="text-white/70 font-mono text-sm uppercase tracking-wider">Technologies Mastered</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
