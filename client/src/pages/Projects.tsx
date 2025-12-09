import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
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
          <span className="font-mono text-neon-pink text-sm uppercase tracking-[0.3em] mb-4 block">
            My Work
          </span>
          <h1 
            className="font-display text-5xl md:text-7xl tracking-wider neon-text-green mb-6"
            data-testid="text-projects-title"
          >
            PROJECTS
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            A selection of projects that showcase my expertise in building
            cutting-edge digital experiences.
          </p>
        </motion.div>

        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card rounded-md p-4">
                <Skeleton className="h-48 w-full rounded-md mb-4 bg-white/5" />
                <Skeleton className="h-8 w-3/4 mb-2 bg-white/5" />
                <Skeleton className="h-4 w-full mb-2 bg-white/5" />
                <Skeleton className="h-4 w-2/3 bg-white/5" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-neon-pink text-lg">Failed to load projects</p>
            <p className="text-white/50 mt-2">Please try again later</p>
          </div>
        )}

        {projects && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-white/50 font-mono text-sm">
            More projects available on{" "}
            <a 
              href="https://github.com/ShivamRaj-git/portfolio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="neon-text-cyan hover:underline"
            >
              GitHub
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
