"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  distance?: number; // px of travel across the viewport pass
}

// Moves content against the scroll for depth. Wrap images or type.
export function Parallax({ children, className, distance = 80 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      {/* Oversized moving layer so a `fill` child stays covered as it travels */}
      <motion.div style={{ y }} className="absolute inset-[-12%] will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
