"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"

export default function HeroAnimation() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  const bubbleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: [0, 0.7, 0],
      y: -100,
      x: Math.sin(i * Math.PI) * 30,
      transition: {
        duration: 2 + i * 0.5,
        repeat: Number.POSITIVE_INFINITY,
        delay: i * 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <div ref={ref} className="relative h-[400px] md:h-[500px] w-full">
      {/* Background elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-white/20 blur-3xl absolute"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative h-full w-full flex items-center justify-center"
      >
        {/* Main product */}
        <motion.div variants={floatVariants} initial="initial" animate="animate" className="relative z-10">
          <Image
            src="/products/detergente-1.png"
            alt="Produto de limpeza Pratt - Distribuído por Otsuka Soluções"
            width={280}
            height={280}
            className="object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Bubbles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            className="absolute bottom-20 left-1/2 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm"
            style={{
              left: `calc(50% + ${(i - 3) * 15}px)`,
              width: `${Math.max(12, 20 - i * 2)}px`,
              height: `${Math.max(12, 20 - i * 2)}px`,
            }}
          />
        ))}

        {/* Splash elements */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 0.8, 0.6],
            rotate: [-10, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-10 -left-10 w-40 h-40"
        >
          <Image src="/splash.png" alt="Splash" fill className="object-contain opacity-60" />
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.1, 0.9],
            opacity: [0, 0.7, 0.5],
            rotate: [10, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 -right-20 w-48 h-48"
        >
          <Image src="/splash.png" alt="Splash" fill className="object-contain opacity-60" />
        </motion.div>
      </motion.div>
    </div>
  )
}
