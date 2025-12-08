import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { path: "/", label: "HOME" },
  { path: "/about", label: "ABOUT" },
  { path: "/skills", label: "SKILLS" },
  { path: "/projects", label: "PROJECTS" },
  { path: "/contact", label: "CONTACT" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-black/90 backdrop-blur-md border-b border-neon-pink/20" 
            : "bg-transparent"
        }`}
        data-testid="navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/">
              <motion.div
                className="font-display text-2xl md:text-3xl tracking-wider cursor-pointer"
                whileHover={{ scale: 1.05 }}
                data-testid="link-logo"
              >
                <span className="neon-text-pink glitch-text" data-text="RAVE">RAVE</span>
                <span className="neon-text-cyan">.DEV</span>
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <motion.div
                    className={`relative px-4 py-2 font-mono text-sm tracking-widest cursor-pointer transition-colors ${
                      location === link.path
                        ? "neon-text-pink"
                        : "text-white/70 hover:text-white"
                    }`}
                    whileHover={{ y: -2 }}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                    {location === link.path && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-pink"
                        layoutId="navIndicator"
                        style={{
                          boxShadow: "0 0 10px #FF10F0, 0 0 20px #FF10F0",
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-20"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <Link key={link.path} href={link.path}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`font-display text-4xl tracking-wider cursor-pointer ${
                      location === link.path
                        ? "neon-text-pink"
                        : "text-white/70"
                    }`}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
