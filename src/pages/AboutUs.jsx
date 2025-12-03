import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'

const AboutUs = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-white">
        {/* Hero Section */}
        <motion.section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="mb-8">
              <h1 className="font-questrial text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold mb-6">
                About
                <span className="block font-baskerville italic text-brand-primary font-light">
                  Tauris Media
                </span>
              </h1>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <p className="font-cormorant text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-white/90">
                We craft premium digital experiences that amplify your brand's essence, 
                transforming visions into compelling narratives that resonate across every touchpoint.
              </p>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-1/4 left-4 w-1 h-32 bg-sticks opacity-60"
            initial={{ height: 0 }}
            animate={{ height: 128 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-4 w-1 h-24 bg-brand-primary opacity-40"
            initial={{ height: 0 }}
            animate={{ height: 96 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          />
        </motion.section>

        {/* Philosophy Section */}
        <motion.section 
          className="py-20 px-4 sm:px-6 md:px-8 lg:px-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeInUp}>
                <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-8">
                  Our
                  <span className="block text-brand-primary italic">Philosophy</span>
                </h2>
                <div className="space-y-6">
                  <p className="font-libre-franklin text-lg sm:text-xl text-white/80 leading-relaxed">
                    Every brand has a unique story waiting to be told. Our approach combines strategic thinking 
                    with creative excellence, ensuring your message not only reaches your audience but creates 
                    lasting emotional connections.
                  </p>
                  <p className="font-libre-franklin text-lg sm:text-xl text-white/80 leading-relaxed">
                    We believe in the power of authentic storytelling, meticulous craftsmanship, and innovative 
                    solutions that push boundaries while staying true to your brand's core values.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={scaleIn} className="relative">
                <div className="aspect-square bg-linear-to-br from-brand-primary/20 to-sticks/10 rounded-3xl p-8 backdrop-blur-sm border border-white/5">
                  <div className="h-full flex flex-col justify-center items-center text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-brand-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">∞</span>
                      </div>
                      <h3 className="font-questrial text-2xl font-bold mb-2">Infinite Possibilities</h3>
                      <p className="font-libre-franklin text-white/70">Where creativity meets strategy</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-white/5 backdrop-blur-sm"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                Core
                <span className="block text-sticks italic">Values</span>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Excellence",
                  description: "Pursuing perfection in every detail, delivering work that exceeds expectations and sets new standards.",
                  icon: "★"
                },
                {
                  title: "Innovation",
                  description: "Embracing cutting-edge technologies and creative solutions to stay ahead of industry trends.",
                  icon: "◆"
                },
                {
                  title: "Authenticity",
                  description: "Staying true to your brand's essence while crafting genuine connections with your audience.",
                  icon: "●"
                }
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-brand-primary/30 transition-all duration-500 group"
                >
                  <div className="text-4xl text-brand-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="font-questrial text-2xl font-bold mb-4 group-hover:text-brand-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="font-libre-franklin text-white/70 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="py-20 px-4 sm:px-6 md:px-8 lg:px-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp}>
              <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-8">
                Ready to
                <span className="block text-brand-primary italic">Collaborate?</span>
              </h2>
              <p className="font-cormorant text-xl sm:text-2xl text-white/80 mb-12 leading-relaxed">
                Let's create something extraordinary together. Your story deserves to be told with excellence.
              </p>
              
              <motion.button
                className="inline-block px-12 py-4 font-questrial text-lg font-medium border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-500 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  )
}

export default AboutUs