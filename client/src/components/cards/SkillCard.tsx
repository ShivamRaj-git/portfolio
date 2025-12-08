import { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { Skill } from "@shared/schema";
import { 
  Code2, 
  Database, 
  Wrench, 
  Palette,
  Braces,
  Globe,
  Server,
  Terminal,
  Layers,
  Cpu,
  Cloud,
  GitBranch,
  Figma,
  Smartphone,
  Box
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code2,
  database: Database,
  wrench: Wrench,
  palette: Palette,
  braces: Braces,
  globe: Globe,
  server: Server,
  terminal: Terminal,
  layers: Layers,
  cpu: Cpu,
  cloud: Cloud,
  git: GitBranch,
  figma: Figma,
  mobile: Smartphone,
  box: Box,
};

const categoryColors = {
  frontend: "#FF10F0",
  backend: "#00D9FF",
  tools: "#39FF14",
  design: "#8B00FF",
};

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = iconMap[skill.icon] || Code2;
  const color = categoryColors[skill.category];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -15;
    const rotateYValue = (mouseX / (rect.width / 2)) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{ perspective: "1000px" }}
      data-testid={`card-skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <motion.div
        className="relative glass-card rounded-md p-4 flex flex-col items-center text-center overflow-visible"
        style={{
          transformStyle: "preserve-3d",
          borderColor: isHovered ? color : "rgba(255, 16, 240, 0.2)",
        }}
        animate={{
          rotateX,
          rotateY,
          borderColor: isHovered ? color : "rgba(255, 16, 240, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className="relative mb-3"
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ 
            color: color,
            filter: isHovered ? `drop-shadow(0 0 10px ${color})` : "none",
          }}
        >
          <IconComponent className="w-8 h-8 transition-all duration-300" />
        </motion.div>

        <span 
          className="font-mono text-sm text-white/90 transition-colors"
          style={{ color: isHovered ? color : undefined }}
        >
          {skill.name}
        </span>

        <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: index * 0.1 }}
          />
        </div>

        <div
          className="absolute -inset-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={{
            backgroundColor: color,
            filter: "blur(15px)",
            opacity: isHovered ? 0.3 : 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
