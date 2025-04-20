import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, useTransform, useSpring, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuToggle: (isOpen: boolean) => void
  isMenuOpen: boolean
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const { scrollYProgress } = useScroll()
  const scrollYProgressSmooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    onMenuToggle(false)
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
      style={{
        backgroundColor: useTransform(
          scrollYProgressSmooth,
          [0, 0.05],
          ["rgba(10, 26, 47, 0)", "rgba(10, 26, 47, 0.8)"]
        ),
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            OTSUKA
          </h1>
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              {[
                { name: "Início", id: "hero" },
                { name: "Produtos", id: "produtos" },
                { name: "Sobre Nós", id: "sobre" },
                { name: "Contato", id: "contato" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white hover:text-cyan-400 font-medium transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

        <motion.button
          className="lg:hidden text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onClick={() => onMenuToggle(!isMenuOpen)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={24} />
        </motion.button>

        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button 
            onClick={() => scrollToSection("contato")}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            Fale Conosco
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
} 