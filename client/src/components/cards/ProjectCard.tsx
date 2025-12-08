import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{
        perspective: "1000px",
      }}
      data-testid={`card-project-${project.id}`}
    >
      <motion.div
        className="relative glass-card rounded-md overflow-visible p-4"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="relative h-48 rounded-md overflow-hidden mb-4">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundColor: "#1a1a1a",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          <div className="absolute bottom-3 left-3 flex gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs bg-black/50 border-neon-pink/50 text-neon-pink"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs bg-black/50 border-neon-cyan/50 text-neon-cyan"
              >
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <h3 className="font-display text-2xl tracking-wider text-white mb-2">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <Link href={`/projects/${project.id}`}>
            <motion.span
              className="text-neon-pink font-mono text-sm uppercase tracking-wider cursor-pointer"
              whileHover={{ x: 5 }}
              data-testid={`link-project-details-${project.id}`}
            >
              View Details
            </motion.span>
          </Link>

          <div className="flex gap-2">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-neon-cyan transition-colors"
                whileHover={{ scale: 1.1 }}
                data-testid={`link-github-${project.id}`}
              >
                <Github className="w-5 h-5" />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-neon-green transition-colors"
                whileHover={{ scale: 1.1 }}
                data-testid={`link-live-${project.id}`}
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>

        <div
          className="absolute -inset-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={{
            background: "linear-gradient(135deg, #FF10F0, #00D9FF, #39FF14)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
