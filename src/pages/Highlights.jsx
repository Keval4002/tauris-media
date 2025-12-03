import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Play, Award } from 'lucide-react'
import Navbar from '../components/layout/Navbar'

const Highlights = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [hoveredProject, setHoveredProject] = React.useState(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const scaleInUp = {
    initial: { opacity: 0, scale: 0.8, y: 40 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'campaigns', name: 'Social Campaigns' }
  ]

  const projects = [
    {
      id: 1,
      title: "Visual Stories Project",
      category: 'campaigns',
      client: "Creative Content Collective",
      year: "2024",
      description: "Started editing short videos for local creators who had amazing stories but no editing skills. What began as helping one filmmaker turned into this whole network of content creators. Now we're editing everything from wedding videos to small business promos.",
      image: "../public/New folder/img-1.jpg",
      tags: ["Video Editing", "Content Creation", "Visual Stories"],
      awards: ["Creative Excellence 2024"],
      featured: true
    },
    {
      id: 2,
      title: "Nightlife Social Hub",
      category: 'campaigns',
      client: "Downtown Bar & Cafe Network",
      year: "2024",
      description: "Managing social media for the coolest spots in town. From crafting the perfect cocktail shot to capturing that Friday night energy, we help bars and cafes build their online vibe. Our posts have become the go-to for weekend plans.",
      image: "../public/New folder/img-2.jpg",
      tags: ["Social Media", "Nightlife", "Bar Marketing"],
      awards: [],
      featured: true
    },
    {
      id: 3,
      title: "Brand Photoshoot Series",
      category: 'campaigns',
      client: "Emerging Fashion Brands",
      year: "2024",
      description: "We connect brands with the right models and photographers to create content that actually sells. From streetwear shoots to luxury fashion campaigns, our team knows how to capture that perfect shot that makes people stop scrolling.",
      image: "../public/New folder/img-5.jpg",
      tags: ["Fashion Photography", "Brand Shoots", "Model Coordination"],
      awards: ["Visual Impact 2024"],
      featured: false
    },
    {
      id: 4,
      title: "Product Launch Campaigns",
      category: 'campaigns',
      client: "Startup Brands",
      year: "2023",
      description: "When brands need that perfect launch moment, we make it happen. Professional shoots, model casting, creative direction - we handle the whole production. Our campaigns have helped launch over 20 successful product lines.",
      image: "../public/New folder/img-6.jpg",
      tags: ["Product Photography", "Model Casting", "Brand Launches"],
      awards: ["Launch Excellence 2023"],
      featured: false
    }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-white">
        {/* Hero Section */}
        <motion.section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 pt-24"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="mb-8">
              <h1 className="font-questrial text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold mb-6">
                Project
                <span className="block font-baskerville italic text-brand-primary font-light">
                  Highlights
                </span>
              </h1>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <p className="font-cormorant text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-white/90 mb-12">
                Creating compelling visual content for brands - from video editing and social media management 
                to professional photoshoots and model coordination.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp} 
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {[
                { number: "200+", label: "Videos Edited" },
                { number: "35", label: "Venues Managed" },
                { number: "50+", label: "Brand Shoots" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-questrial text-3xl sm:text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="font-libre-franklin text-sm sm:text-base text-white/70">
                    {stat.label}
                  </div>
                </div>
              ))}
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

        {/* Featured Projects */}
        <motion.section 
          className="py-20 px-4 sm:px-6 md:px-8 lg:px-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="mb-16">
              <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                Some of Our
                <span className="block text-sticks italic">Favorites</span>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {featuredProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  variants={scaleInUp}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative overflow-hidden rounded-3xl aspect-4/3 mb-6">
                    <img
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Project info overlay */}
                    <div className="absolute bottom-6 left-6 right-6 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex items-center gap-3 text-white">
                        {project.awards.length > 0 && (
                          <Award className="w-5 h-5 text-sticks" />
                        )}
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-libre-franklin text-sm text-brand-primary uppercase tracking-wider">
                        {project.client}
                      </span>
                      <span className="font-libre-franklin text-sm text-white/50">
                        {project.year}
                      </span>
                    </div>
                    
                    <h3 className="font-questrial text-2xl sm:text-3xl font-bold group-hover:text-brand-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="font-libre-franklin text-white/70 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 text-xs font-libre-franklin bg-white/5 rounded-full border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {project.awards.length > 0 && (
                      <div className="pt-2">
                        {project.awards.map((award, idx) => (
                          <span key={idx} className="flex items-center gap-2 text-sticks text-sm font-libre-franklin">
                            <Award className="w-4 h-4" />
                            {award}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* All Projects */}
        <motion.section 
          className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-white/5 backdrop-blur-sm"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="mb-16">
              <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-12">
                More
                <span className="block text-brand-primary italic">Stories</span>
              </h2>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-4 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 font-questrial rounded-full border-2 transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'border-brand-primary text-brand-primary bg-brand-primary/10'
                        : 'border-white/20 text-white/70 hover:border-brand-primary/50 hover:text-white'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  variants={scaleInUp}
                  layout
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-3/4 mb-4">
                    <img
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-libre-franklin bg-black/50 backdrop-blur-sm rounded-full text-white border border-white/20">
                        {categories.find(cat => cat.id === project.category)?.name}
                      </span>
                    </div>
                    
                    {/* Awards badge */}
                    {project.awards.length > 0 && (
                      <div className="absolute top-4 right-4">
                        <Award className="w-5 h-5 text-sticks" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-libre-franklin text-xs text-brand-primary uppercase tracking-wider">
                        {project.client}
                      </span>
                      <span className="font-libre-franklin text-xs text-white/50">
                        {project.year}
                      </span>
                    </div>
                    
                    <h3 className="font-questrial text-xl font-bold group-hover:text-brand-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs font-libre-franklin bg-white/5 rounded-full border border-white/10">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs font-libre-franklin text-white/50">
                          +{project.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
                Got a Story
                <span className="block text-brand-primary italic">to Tell?</span>
              </h2>
              <p className="font-cormorant text-xl sm:text-2xl text-white/80 mb-12 leading-relaxed">
                We'd love to help you share it. No fancy contracts, just real conversations about real stories.
              </p>
              
              <motion.button
                className="inline-block px-12 py-4 font-questrial text-lg font-medium border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-500 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Chat
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  )
}

export default Highlights