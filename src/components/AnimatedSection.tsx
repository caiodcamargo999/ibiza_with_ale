"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: "fade" | "slide-up" | "scale-up" | "slide-left" | "slide-right";
}

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.65,
  variant = "slide-up"
}: Props) {
  
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    "slide-up": {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 }
    },
    "scale-up": {
      initial: { opacity: 0, scale: 0.97 },
      animate: { opacity: 1, scale: 1 }
    },
    "slide-left": {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 }
    },
    "slide-right": {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      initial={variants[variant].initial}
      whileInView={variants[variant].animate}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

