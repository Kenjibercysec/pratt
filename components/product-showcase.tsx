"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

// Product data
const products = [
  {
    id: 1,
    name: "Desinfetantes",
    image: "/products/desinfetante-1.png",
    color: "#8A4FFF",
    description: "Elimina 99.9% das bactérias com fragrância duradoura.",
    features: ["Alta concentração", "Ação bactericida", "Fragrância duradoura", "Rendimento superior"],
  },
  {
    id: 2,
    name: "Detergentes",
    image: "/products/detergente-1.png",
    color: "#FF4F4F",
    description: "Poder de limpeza superior com fórmula concentrada.",
    features: ["Desengraxante potente", "Biodegradável", "Múltiplas superfícies", "Econômico"],
  },
  {
    id: 3,
    name: "Sabonetes",
    image: "/products/sabonete-1.png",
    color: "#4FD1FF",
    description: "Limpeza suave para as mãos com hidratação.",
    features: ["Hidratação profunda", "Dermatologicamente testado", "Fragrância suave", "Ação antibacteriana"],
  },
  {
    id: 4,
    name: "Linha Ultra",
    image: "/products/linha-ultra-1.png",
    color: "#4FFFB0",
    description: "Produtos premium com fragrância exclusiva.",
    features: ["Fórmula premium", "Alta performance", "Fragrância exclusiva", "Tecnologia avançada"],
  },
  {
    id: 5,
    name: "Lavanderia",
    image: "/products/lavanderia-1.png",
    color: "#4F74FF",
    description: "Soluções especializadas para lavagem de roupas.",
    features: ["Remove manchas difíceis", "Preserva as cores", "Perfume duradouro", "Fórmula concentrada"],
  },
  {
    id: 6,
    name: "Outros",
    image: "/products/outros-1.png",
    color: "#A0A0A0",
    description: "Soluções especializadas para necessidades específicas.",
    features: ["Aplicações especiais", "Alta eficiência", "Soluções customizadas", "Resultados profissionais"],
  },
]

export default function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextProduct = () => {
    setDirection(1)
    setActiveProduct((prev) => (prev + 1) % products.length)
  }

  const prevProduct = () => {
    setDirection(-1)
    setActiveProduct((prev) => (prev - 1 + products.length) % products.length)
  }

  const handleProductClick = (index: number) => {
    setDirection(index > activeProduct ? 1 : -1)
    setActiveProduct(index)
  }

  const product = products[activeProduct]

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <motion.button
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          onClick={prevProduct}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <motion.button
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          onClick={nextProduct}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
        <div
          className="absolute inset-0 opacity-20 z-0"
          style={{
            background: `radial-gradient(circle at center, ${product.color}, transparent 70%)`,
            filter: "blur(60px)",
          }}
        ></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`image-${activeProduct}`}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex justify-center items-center"
            >
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-full"
                  style={{ background: `radial-gradient(circle at center, ${product.color}40, transparent)` }}
                ></div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`content-${activeProduct}`}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <div>
                <span
                  className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/20 mb-4"
                  style={{ color: product.color }}
                >
                  Produto Pratt
                </span>
                <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                  {product.name}
                </h3>
                <p className="text-xl text-white/80 mt-4">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: product.color }}
                    >
                      <Plus size={14} className="text-white" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium px-8 py-6 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105">
                  Ver detalhes
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {products.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeProduct ? "bg-cyan-400" : "bg-white/30"
            }`}
            onClick={() => handleProductClick(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}
