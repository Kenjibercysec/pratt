import Image from "next/image"
import { X, Instagram, Youtube, Facebook } from "lucide-react"
import { motion } from "framer-motion"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (id: string) => void
}

export default function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const menuItems = [
    { name: "Início", id: "hero" },
    { name: "Produtos", id: "produtos" },
    { name: "Sobre Nós", id: "sobre" },
    { name: "Contato", id: "contato" },
  ]

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex flex-col"
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-between items-center p-6 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src="/otsuka-logo.png"
            alt="Otsuka Soluções Logo"
            width={120}
            height={48}
            className="object-contain"
          />
        </motion.div>
        <motion.button
          className="text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onClick={onClose}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>
      </div>

      <nav className="flex-1 flex flex-col justify-center p-8">
        <ul className="space-y-6">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
              className="border-b border-white/10 pb-4"
            >
              <button
                onClick={() => onNavigate(item.id)}
                className="text-2xl font-bold tracking-wider hover:text-cyan-400 transition-colors flex items-center gap-2 w-full"
              >
                <span className="text-cyan-500 font-mono">0{index + 1}.</span>
                {item.name}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="p-8 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4"
        >
          {[Instagram, Youtube, Facebook].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
} 