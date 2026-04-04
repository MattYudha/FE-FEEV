"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface NeoCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "error" | "surface" | "white";
  className?: string;
  hoverable?: boolean;
}

const variantColors = {
  primary: "bg-primary-container",
  secondary: "bg-secondary-container",
  tertiary: "bg-tertiary-container",
  error: "bg-error-container",
  surface: "bg-surface",
  white: "bg-white",
};

export const NeoCard: React.FC<NeoCardProps> = ({
  children,
  variant = "white",
  className = "",
  hoverable = true,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.02, x: -4, y: -4, boxShadow: "10px 10px 0px 0px #000000" } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`neo-border neo-shadow ${variantColors[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
