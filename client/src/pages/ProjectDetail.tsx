import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { NeonButton } from "@/components/effects/NeonButton";
import type { Project } from "@shared/schema";

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["/api/projects", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${params.id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch project");
      return res.json();
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-8 w-40 mb-8 bg-white/5" />
          <Skeleton className="h-[400px] w-full rounded-md mb-8 bg-white/5" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-8 w-1/3 bg-white/5" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-3/4 bg-white/5" />
            </div>
            <div>
              <Skeleton className="h-40 w-full rounded-md bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl neon-text-pink mb-4">Project Not Found</h1>
          <p className="text-white/60 mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <NeonButton variant="cyan">Back to Projects</NeonButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/projects">
            <motion.div
              className="inline-flex items-center gap-2 text-white/60 hover:text-neon-pink transition-colors mb-8 cursor-pointer font-mono text-sm"
              whileHover={{ x: -5 }}
              data-testid="link-back-projects"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-md overflow-hidden mb-8"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <Badge 
              variant="outline" 
              className="mb-4 bg-black/50 border-neon-cyan/50 text-neon-cyan"
            >
              {project.category}
            </Badge>
            <h1 
              className="font-display text-4xl md:text-6xl tracking-wider neon-text-pink"
              data-testid={`text-project-title-${project.id}`}
            >
              {project.title}
            </h1>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <h2 className="font-display text-2xl tracking-wider text-white mb-4">
              OVERVIEW
            </h2>
            <p className="text-white/80 leading-relaxed mb-6">
              {project.longDescription}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <NeonButton variant="pink" data-testid="button-live-demo">
                    <span className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </span>
                  </NeonButton>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <NeonButton variant="cyan" data-testid="button-source-code">
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      Source Code
                    </span>
                  </NeonButton>
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-card rounded-md p-6">
              <h3 className="font-display text-xl tracking-wider text-white mb-4">
                TECH STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="bg-transparent border-neon-green/50 text-neon-green"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
