"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F] via-[#0F2D4A] to-[#164B7A]" />
      
      {/* Particles - reduced count and normalized timing */}
      {[...Array(12)].map((_, i) => {
        const size = Math.random() * 1.5 + 0.5 // Smaller particles
        const duration = 8 // Consistent duration
        const delay = i * 0.5 // Evenly spaced delays

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.3, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Number.POSITIVE_INFINITY,
              delay,
              ease: "easeInOut",
            }}
          />
        )
      })}

      {/* Optimized gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-[100px]" />
      </div>
    </div>
  )
}
