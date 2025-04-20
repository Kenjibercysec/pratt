"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Menu, X, Facebook, Instagram, Youtube, MapPin, Mail, Phone, ChevronDown } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import ProductShowcase from "@/components/product-showcase"
import ParticleBackground from "@/components/particle-background"
import HeroProduct3D from "@/components/hero-product-3d"

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
      {/* Particle Background */}
      <ParticleBackground />

      {/* Mobile Menu - Initially Hidden */}
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex flex-col"
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? 0 : "-100%" }}
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
            onClick={() => setIsMenuOpen(false)}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        </div>

        <nav className="flex-1 flex flex-col justify-center p-8">
          <ul className="space-y-6">
            {[
              { name: "Início", id: "hero" },
              { name: "Produtos", id: "produtos" },
              { name: "Sobre Nós", id: "sobre" },
              { name: "Contato", id: "contato" },
            ].map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                className="border-b border-white/10 pb-4"
              >
                <button
                  onClick={() => scrollToSection(item.id)}
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

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          backgroundColor: useTransform(
            scrollYProgressSmooth,
            [0, 0.05],
            ["rgba(10, 26, 47, 0)", "rgba(10, 26, 47, 0.8)"],
          ),
        }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Image
              src="/otsuka-logo.png"
              alt="Otsuka Soluções Logo"
              width={120}
              height={48}
              className="object-contain"
            />
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
            onClick={() => setIsMenuOpen(true)}
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
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-cyan-500/20 transition-all">
              Fale Conosco
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-[120px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-8 max-w-xl" style={{ y: heroTextY, opacity: heroOpacity }}>
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
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105">
                  Conheça nossos produtos
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 font-medium px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
                >
                  Solicitar orçamento
                </Button>
              </motion.div>

              <motion.div
                className="pt-8 flex items-center gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-white bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-cyan-100 font-medium">Mais de 500 clientes satisfeitos</p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <span className="ml-2 text-white">4.9/5</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="relative z-10 flex justify-center" style={{ y: heroImageY, opacity: heroOpacity }}>
              <HeroProduct3D />
            </motion.div>
          </div>
        </div>

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
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400/60 to-blue-500/60 bg-clip-text text-transparent rotate-[-20deg]">
              Otsuka
            </div>
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
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400/60 to-blue-500/60 bg-clip-text text-transparent rotate-[20deg]">
              Soluções
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <p className="text-cyan-300 mb-2 text-sm">Descubra mais</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            <ChevronDown className="text-cyan-300" size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="relative py-32 overflow-hidden" ref={productsRef}>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0F2D4A] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0F2D4A] to-transparent"></div>
        </div>

        <motion.div
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={productsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={productsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20">
                Produtos Pratt
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                Linha Completa de Produtos
              </h2>
              <p className="max-w-[700px] mx-auto text-xl text-cyan-50/90 mb-8">
                A Otsuka Soluções é distribuidora oficial dos produtos Pratt, reconhecidos pela qualidade e eficiência.
              </p>
            </motion.div>
          </div>

          <ProductShowcase />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="sobre" className="relative py-32 overflow-hidden" ref={aboutRef}>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 text-sm font-medium border border-cyan-500/20">
                Nossa História
              </span>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                Otsuka Soluções
              </h2>
              <p className="text-xl text-cyan-50/90 leading-relaxed">
                A Otsuka Soluções é especializada em fornecer produtos de limpeza profissional de alta qualidade para
                empresas e instituições. Como distribuidora oficial da linha Pratt, garantimos soluções eficientes e
                sustentáveis para todas as necessidades de limpeza.
              </p>
              <p className="text-xl text-cyan-50/90 leading-relaxed">
                Nossa missão é oferecer o melhor atendimento e os melhores produtos do mercado, com foco na satisfação
                do cliente e resultados superiores. Contamos com uma equipe especializada para auxiliar na escolha dos
                produtos ideais para cada aplicação.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">10+</div>
                  <p className="text-white/80">Anos de experiência</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">500+</div>
                  <p className="text-white/80">Clientes satisfeitos</p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium px-8 py-6 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105">
                  Conheça nossa história
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl transform -translate-x-4 translate-y-4"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <rect x="0" y="0" width="100" height="100" fill="url(#radialGradient)" />
                  </svg>
                </div>

                <div className="flex flex-col items-center space-y-12 py-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={aboutInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Image
                      src="/otsuka-logo.png"
                      alt="Otsuka Soluções Logo"
                      width={220}
                      height={88}
                      className="object-contain"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={aboutInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-cyan-500/30 blur-md rounded-full"></div>
                    <div className="relative text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                      +
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={aboutInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Image src="/logo.png" alt="Pratt Logo" width={220} height={88} className="object-contain" />
                  </motion.div>
                </div>

                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="relative py-32 overflow-hidden" ref={contactRef}>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0F2D4A] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#164B7A] to-transparent"></div>
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[120px]"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px]"></div>
        </div>

        <motion.div
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={contactInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 text-sm font-medium mb-4 border border-cyan-500/20">
                Fale Conosco
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                Entre em contato conosco!
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl transform -translate-x-4 translate-y-4"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-white">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-white/50"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-white/50"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium text-white">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-white/50"
                      placeholder="Como podemos ajudar?"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-4 rounded-lg shadow-lg transition-all hover:shadow-cyan-500/30 hover:scale-105">
                    Enviar mensagem
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl transform -translate-x-4 translate-y-4"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
                  <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                    Redes Sociais
                  </h3>
                  <div className="space-y-4">
                    <motion.a
                      href="#"
                      className="flex items-center gap-3 hover:bg-white/10 p-3 rounded-xl transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Instagram className="h-6 w-6" />
                      </div>
                      <span className="text-lg">@otsukaSolucoes</span>
                    </motion.a>
                    <motion.a
                      href="#"
                      className="flex items-center gap-3 hover:bg-white/10 p-3 rounded-xl transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Youtube className="h-6 w-6" />
                      </div>
                      <span className="text-lg">youtube.com/otsukaSolucoes</span>
                    </motion.a>
                    <motion.a
                      href="#"
                      className="flex items-center gap-3 hover:bg-white/10 p-3 rounded-xl transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Facebook className="h-6 w-6" />
                      </div>
                      <span className="text-lg">fb.com/otsukaSolucoes</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl transform -translate-x-4 translate-y-4"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
                  <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                    Informações de Contato
                  </h3>
                  <div className="space-y-6">
                    <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }}>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-cyan-200 mb-1">Endereço</h4>
                        <p className="text-white/80">
                          Av. Principal, 1000 - Centro Empresarial, Salvador - BA, 40000-000
                        </p>
                      </div>
                    </motion.div>
                    <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }}>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-cyan-200 mb-1">Email</h4>
                        <p className="text-white/80">contato@otsuka.com.br</p>
                      </div>
                    </motion.div>
                    <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }}>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-cyan-200 mb-1">Telefone</h4>
                        <p className="text-white/80">+55 71 3333-4444</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#164B7A] to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src="/otsuka-logo.png"
                alt="Otsuka Soluções Logo"
                width={150}
                height={60}
                className="object-contain"
              />
              <p className="mt-4 text-white/60 max-w-md">
                Soluções completas em produtos de limpeza profissional. Distribuidor oficial da linha Pratt.
              </p>
            </motion.div>

            <motion.div
              className="text-center md:text-right"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex gap-4 mb-4 justify-center md:justify-end">
                {[Instagram, Youtube, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
              <p className="text-white/60">
                © {new Date().getFullYear()} Otsuka Soluções. Todos os direitos reservados.
              </p>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" fill="currentColor" />
        </svg>
      </motion.button>
    </main>
  )
}
