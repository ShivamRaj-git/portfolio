import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "pink" | "cyan" | "green";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  "data-testid"?: string;
}

const colorVariants = {
  pink: {
    border: "#FF10F0",
    glow: "rgba(255, 16, 240, 0.6)",
    hoverBg: "rgba(255, 16, 240, 0.15)",
  },
  cyan: {
    border: "#00D9FF",
    glow: "rgba(0, 217, 255, 0.6)",
    hoverBg: "rgba(0, 217, 255, 0.15)",
  },
  green: {
    border: "#39FF14",
    glow: "rgba(57, 255, 20, 0.6)",
    hoverBg: "rgba(57, 255, 20, 0.15)",
  },
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function NeonButton({
  children,
  onClick,
  variant = "pink",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  "data-testid": testId,
}: NeonButtonProps) {
  const colors = colorVariants[variant];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        font-mono font-bold uppercase tracking-widest
        border-2 bg-transparent
        transition-all duration-300
        ${sizeClasses[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      style={{
        borderColor: colors.border,
        color: colors.border,
      }}
      whileHover={!disabled ? {
        scale: 1.02,
        boxShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}, inset 0 0 20px ${colors.hoverBg}`,
        backgroundColor: colors.hoverBg,
        color: "#ffffff",
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      data-testid={testId}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
