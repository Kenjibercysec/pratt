"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"

export default function HeroProduct3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        y: [0, -15, 0],
        transition: { duration: 3, ease: "easeInOut" },
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [controls])

  return (
    <div ref={containerRef} className="relative w-full h-[400px] md:h-[500px]">
      {/* Main product */}
      <motion.div
        animate={controls}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-8 rounded-full opacity-40 blur-2xl"
            animate={{
              background: [
                "radial-gradient(circle at center, rgba(77, 209, 255, 0.3), transparent 70%)",
                "radial-gradient(circle at center, rgba(77, 209, 255, 0.15), transparent 70%)",
                "radial-gradient(circle at center, rgba(77, 209, 255, 0.3), transparent 70%)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
          <Image
            src="/products/detergente-1.png"
            alt="Produto de limpeza Pratt - Distribuído por Otsuka Soluções"
            width={300}
            height={300}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

      {/* Floating bubbles - reduced count and normalized timing */}
      {[...Array(4)].map((_, i) => {
        const size = Math.random() * 15 + 8
        const delay = i * 0.5
        const duration = 3
        const initialX = (Math.random() - 0.5) * 120
        const initialY = (Math.random() - 0.5) * 120

        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full bg-cyan-500/15 backdrop-blur-sm border border-cyan-500/20"
            style={{
              width: size,
              height: size,
              x: initialX,
              y: initialY,
            }}
            animate={{
              y: [initialY, initialY - 40, initialY],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
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

      {/* Background glow */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-64 h-64 rounded-full bg-cyan-500/15 filter blur-[60px]"></div>
        </div>
      </div>
    </div>
  )
}
