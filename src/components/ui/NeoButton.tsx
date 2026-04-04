"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface NeoButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "error" | "surface" | "dark" | "light";
  className?: string;
}

const variantColors = {
  primary: "bg-primary-container",
  secondary: "bg-secondary-container",
  tertiary: "bg-tertiary-container",
  error: "bg-error-container",
  surface: "bg-surface",
  dark: "bg-black text-white",
  light: "bg-white text-black",
};

export const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ x: -4, y: -4, boxShadow: "10px 10px 0px 0px #000000" }}
      whileTap={{ x: 6, y: 6, boxShadow: "0px 0px 0px 0px #000000" }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      style={{ boxShadow: "6px 6px 0px 0px #000000" }}
      className={`neo-border font-headline font-bold uppercase flex items-center justify-center gap-2 ${variantColors[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
