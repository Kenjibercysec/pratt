"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"

export default function HeroProduct3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    setMousePosition({ x: mouseX, y: mouseY })
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    controls.start({
      rotateX: 0,
      rotateY: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    })
    x.set(0)
    y.set(0)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        y: [0, -20, 0],
        transition: { duration: 4, ease: "easeInOut" },
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [controls])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={{
          rotateX,
          rotateY,
        }}
      >
        {/* Main product */}
        <motion.div
          animate={controls}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-8 rounded-full opacity-60 blur-2xl"
              animate={{
                background: [
                  "radial-gradient(circle at center, rgba(77, 209, 255, 0.4), transparent 70%)",
                  "radial-gradient(circle at center, rgba(77, 209, 255, 0.2), transparent 70%)",
                  "radial-gradient(circle at center, rgba(77, 209, 255, 0.4), transparent 70%)",
                ],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
            <Image
              src="/products/detergente-1.png"
              alt="Produto de limpeza Pratt - Distribuído por Otsuka Soluções"
              width={300}
              height={300}
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Floating bubbles */}
        {[...Array(8)].map((_, i) => {
          const size = Math.random() * 30 + 10
          const delay = Math.random() * 2
          const duration = Math.random() * 3 + 3
          const initialX = (Math.random() - 0.5) * 200
          const initialY = (Math.random() - 0.5) * 200

          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30"
              style={{
                width: size,
                height: size,
                x: initialX,
                y: initialY,
                z: Math.random() * 100 - 50,
              }}
              animate={{
                y: [initialY, initialY - 100, initialY],
                opacity: [0.2, 0.8, 0.2],
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

        {/* Decorative elements replacing splash image */}
        <motion.div
          className="absolute bottom-0 -left-20 w-64 h-64 z-10"
          animate={{
            rotate: [0, 10, 0],
            scale: [0.9, 1.1, 0.9],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-3xl font-bold text-cyan-400/60 rotate-[-20deg]">Otsuka</div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-20 -right-20 w-64 h-64 z-10"
          animate={{
            rotate: [0, -10, 0],
            scale: [0.8, 1, 0.8],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-3xl font-bold text-cyan-400/60 rotate-[20deg]">Soluções</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
