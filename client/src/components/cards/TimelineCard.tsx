import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import type { TimelineItem } from "@shared/schema";

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isLeft: boolean;
}

export function TimelineCard({ item, index, isLeft }: TimelineCardProps) {
  const Icon = item.type === "education" ? GraduationCap : Briefcase;
  const color = item.type === "education" ? "#00D9FF" : "#FF10F0";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"} mb-12`}
      data-testid={`timeline-item-${item.id}`}
    >
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <motion.div
          className="glass-card rounded-md p-6 inline-block max-w-md"
          whileHover={{ 
            scale: 1.02,
            boxShadow: `0 0 30px ${color}40`,
          }}
          style={{
            borderColor: `${color}40`,
          }}
        >
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? "justify-end" : "justify-start"}`}>
            <Icon 
              className="w-5 h-5" 
              style={{ color }}
            />
            <span 
              className="font-mono text-sm uppercase tracking-wider"
              style={{ color }}
            >
              {item.year}
            </span>
          </div>

          <h3 className="font-display text-xl tracking-wider text-white mb-1">
            {item.title}
          </h3>
          
          <p className="text-white/60 text-sm mb-2">{item.subtitle}</p>
          
          <p className="text-muted-foreground text-sm">{item.description}</p>
        </motion.div>
      </div>

      <div className="relative z-10 flex-shrink-0">
        <motion.div
          className="w-4 h-4 rounded-full"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 20px ${color}`,
          }}
          whileHover={{ scale: 1.5 }}
        />
      </div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}
