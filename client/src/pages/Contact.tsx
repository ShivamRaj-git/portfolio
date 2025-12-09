import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { NeonButton } from "@/components/effects/NeonButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com", color: "#fff" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com", color: "#00D9FF" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com", color: "#FF10F0" },
  { name: "Email", icon: Mail, url: "mailto:shivamraj@example.com", color: "#39FF14" },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response;
    },
    onSuccess: () => {
      setIsSuccess(true);
      reset();
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-neon-cyan text-sm uppercase tracking-[0.3em] mb-4 block">
            Get In Touch
          </span>
          <h1 
            className="font-display text-5xl md:text-7xl tracking-wider neon-text-pink mb-6"
            data-testid="text-contact-title"
          >
            CONTACT
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together.
            Drop me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80 font-mono text-sm uppercase tracking-wider">
                  Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="bg-black/50 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-neon-pink focus:ring-0 transition-colors"
                  placeholder="Your name"
                  data-testid="input-name"
                />
                {errors.name && (
                  <p className="text-neon-pink text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80 font-mono text-sm uppercase tracking-wider">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-black/50 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-neon-cyan focus:ring-0 transition-colors"
                  placeholder="your@email.com"
                  data-testid="input-email"
                />
                {errors.email && (
                  <p className="text-neon-pink text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/80 font-mono text-sm uppercase tracking-wider">
                  Message
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  rows={6}
                  className="bg-black/50 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-neon-green focus:ring-0 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  data-testid="input-message"
                />
                {errors.message && (
                  <p className="text-neon-pink text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <NeonButton
                type="submit"
                variant="pink"
                size="lg"
                className="w-full"
                disabled={mutation.isPending}
                data-testid="button-send-message"
              >
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                )}
              </NeonButton>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-between"
          >
            <div className="glass-card rounded-md p-8 mb-8">
              <h2 className="font-display text-2xl tracking-wider text-white mb-4">
                LET'S CONNECT
              </h2>
              <p className="text-white/70 mb-6">
                I'm always open to discussing new projects, creative ideas, or 
                opportunities to be part of your visions.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-green" />
                  <span className="text-white/80">Available for freelance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                  <span className="text-white/80">Open to full-time opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-pink" />
                  <span className="text-white/80">Interested in collaborations</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm font-mono">
                  📍 Patna, India
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl tracking-wider text-white mb-4">
                SOCIALS
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="group relative w-12 h-12 flex items-center justify-center rounded-md border border-white/20 transition-all duration-300"
                    style={{
                      ["--hover-color" as string]: social.color,
                    }}
                    whileHover={{
                      borderColor: social.color,
                      boxShadow: `0 0 20px ${social.color}40`,
                    }}
                    data-testid={`link-social-${social.name.toLowerCase()}`}
                  >
                    <social.icon 
                      className="w-5 h-5 text-white/60 transition-colors group-hover:text-white"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
