"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import ProductShowcase from "@/components/product-showcase"
import ParticleBackground from "@/components/particle-background"
import HeroProduct3D from "@/components/hero-product-3d"
import Header from "@/components/Header"
import MobileMenu from "@/components/MobileMenu"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scrollYProgressSmooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Parallax effects
  const heroTextY = useTransform(scrollYProgressSmooth, [0, 0.2], [0, -100])
  const heroImageY = useTransform(scrollYProgressSmooth, [0, 0.2], [0, -50])
  const heroOpacity = useTransform(scrollYProgressSmooth, [0, 0.2], [1, 0])

  // Refs for section animations
  const aboutRef = useRef(null)
  const productsRef = useRef(null)
  const contactRef = useRef(null)

  const aboutInView = useInView(aboutRef, { once: false, margin: "-100px" })
  const productsInView = useInView(productsRef, { once: false, margin: "-100px" })
  const contactInView = useInView(contactRef, { once: false, margin: "-100px" })

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0A1A2F] via-[#0F2D4A] to-[#164B7A] text-white">
      <ParticleBackground />
      
      <Header 
        isMenuOpen={isMenuOpen} 
        onMenuToggle={setIsMenuOpen} 
      />
      
      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollToSection}
      />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-[120px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8 max-w-xl" 
              style={{ y: heroTextY, opacity: heroOpacity }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20 backdrop-blur-sm">
                  Distribuidor Oficial Pratt
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                  Soluções de Limpeza Profissional
                </h1>
                <p className="text-xl md:text-2xl mt-6 text-cyan-50/90 leading-relaxed">
                  Transforme seus espaços com produtos de alta performance e qualidade superior.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <Button 
                  onClick={() => scrollToSection("produtos")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
                >
                  Conheça nossos produtos
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contato")}
                  className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 font-medium px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
                >
                  Solicitar orçamento
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              style={{ y: heroImageY }}
            >
              <HeroProduct3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="produtos"
        ref={productsRef}
        className="py-24 relative z-10"
      >
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={productsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
              Nossos Produtos
            </h2>
            <p className="text-xl text-cyan-50/90 max-w-2xl mx-auto">
              Descubra nossa linha completa de produtos de limpeza profissional para todas as suas necessidades.
            </p>
          </div>
          
          <ProductShowcase />
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="sobre"
        ref={aboutRef}
        className="py-24 relative z-10 bg-gradient-to-b from-transparent to-[#0A1A2F]/50"
      >
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
                Sobre a Otsuka Soluções
              </h2>
              <p className="text-xl text-cyan-50/90 mb-8">
                Há mais de uma década, somos referência em soluções de limpeza profissional, 
                oferecendo produtos de alta qualidade e suporte técnico especializado.
              </p>
              <ul className="space-y-4">
                {[
                  "Distribuidor oficial Pratt",
                  "Atendimento personalizado",
                  "Suporte técnico especializado",
                  "Produtos certificados",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-lg text-cyan-50/90"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] lg:h-[600px]">
              {/* Placeholder for about image or 3D model */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl backdrop-blur-sm border border-white/10"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section
        id="contato"
        ref={contactRef}
        className="py-24 relative z-10"
      >
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={contactInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
              Entre em Contato
            </h2>
            <p className="text-xl text-cyan-50/90 max-w-2xl mx-auto">
              Estamos prontos para ajudar você a encontrar as melhores soluções para sua empresa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-4">Informações de Contato</h3>
                <div className="space-y-4">
                  {[
                    { icon: "phone", text: "(11) 1234-5678" },
                    { icon: "mail", text: "contato@otsuka.com.br" },
                    { icon: "map", text: "São Paulo, SP" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 text-cyan-50/90">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                        <span className="text-2xl">{item.icon === "phone" ? "📞" : item.icon === "mail" ? "📧" : "📍"}</span>
                      </div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-4">Horário de Atendimento</h3>
                <p className="text-cyan-50/90">
                  Segunda a Sexta: 9h às 18h<br />
                  Sábado: 9h às 13h
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Envie sua Mensagem</h3>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-cyan-50/90">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-cyan-50/90">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-cyan-50/90">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Sua mensagem"
                  ></textarea>
                </div>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-4 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
