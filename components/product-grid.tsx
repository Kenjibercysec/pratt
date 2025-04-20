"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Product data
const products = [
  {
    id: 1,
    name: "Desinfetantes",
    image: "/products/desinfetante-1.png",
    color: "#8A4FFF",
    description: "Elimina 99.9% das bactérias com fragrância duradoura.",
  },
  {
    id: 2,
    name: "Detergentes",
    image: "/products/detergente-1.png",
    color: "#FF4F4F",
    description: "Poder de limpeza superior com fórmula concentrada.",
  },
  {
    id: 3,
    name: "Sabonetes",
    image: "/products/sabonete-1.png",
    color: "#4FD1FF",
    description: "Limpeza suave para as mãos com hidratação.",
  },
  {
    id: 4,
    name: "Linha Ultra",
    image: "/products/linha-ultra-1.png",
    color: "#4FFFB0",
    description: "Produtos premium com fragrância exclusiva.",
  },
  {
    id: 5,
    name: "Lavanderia",
    image: "/products/lavanderia-1.png",
    color: "#4F74FF",
    description: "Soluções especializadas para lavagem de roupas.",
  },
  {
    id: 6,
    name: "Outros",
    image: "/products/outros-1.png",
    color: "#A0A0A0",
    description: "Soluções especializadas para necessidades específicas.",
  },
]

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

  const handleProductClick = (id: number) => {
    setSelectedProduct(selectedProduct === id ? null : id)
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className={`relative group cursor-pointer bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 overflow-hidden border border-white/20
              ${selectedProduct === product.id ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""}`}
            onClick={() => handleProductClick(product.id)}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`absolute inset-0 opacity-20 rounded-xl`} style={{ backgroundColor: product.color }}></div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center p-2">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={selectedProduct === product.id ? 180 : 100}
                  height={selectedProduct === product.id ? 180 : 100}
                  className="object-contain transition-all duration-300 transform group-hover:scale-110"
                />
              </div>

              <div className="mt-2 text-center">
                <h3 className="font-semibold text-white">{product.name}</h3>

                {selectedProduct === product.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 space-y-3"
                  >
                    <p className="text-sm text-white/80">{product.description}</p>
                    <Button className="w-full bg-white text-[#3DCBDE] hover:bg-white/90">Ver detalhes</Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
