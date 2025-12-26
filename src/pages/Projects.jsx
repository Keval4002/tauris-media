import React from 'react'
import ProjectScreen from '../components/ProjectScreen';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Brands from '../components/Brands';
import { videos } from "../utils/ProjectVideo.js"
import { brands } from "../utils/BrandsInfo.js"

const Projects = () => {
  const [visibleIndices, setVisibleIndices] = React.useState([0, 1, 2]);
  const stateRef = React.useRef({
    nextBrandIndex: 3,
    lastSlotIndex: -1
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const { nextBrandIndex, lastSlotIndex } = stateRef.current;
      
      // Randomly select a slot to update, avoiding the same slot twice in a row
      let slotToUpdate;
      do {
        slotToUpdate = Math.floor(Math.random() * 3);
      } while (slotToUpdate === lastSlotIndex);

      setVisibleIndices(prev => {
        const newIndices = [...prev];
        newIndices[slotToUpdate] = nextBrandIndex;
        return newIndices;
      });

      // Update refs
      stateRef.current.nextBrandIndex = (nextBrandIndex + 1) % brands.length;
      stateRef.current.lastSlotIndex = slotToUpdate;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    window.history.scrollRestoration = 'manual';
  }, []);

  const targetRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"] 
  });

  // Adjust the percentage based on number of videos
  const scrollPercentage = ((videos.length - 1) / videos.length) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${scrollPercentage}%`]);

  return (
    <div className='relative w-full bg-black min-h-screen'>

      {/* Fixed background video */}
      <div className='fixed top-0 left-0 w-full h-screen z-0'>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className='w-full h-full object-cover'
          style={{ playbackRate: 0.5 }}
          ref={(video) => { if (video) video.playbackRate = 0.5; }}
          src="/videos/project-bg.mp4"
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black/30' />
      </div>

      {/* Horizontal scroll section - REMOVED bg-black here so video shows */}
      <section ref={targetRef} className='relative h-[300vh] z-10'>
        <div className='sticky top-0 h-screen flex flex-col items-start justify-center overflow-hidden pt-24 pb-20 sm:pb-24 pl-0'>
          
          {/* Title - Fixed Animation */}
          <div className='absolute bottom-6 left-0 w-full text-center z-20 pointer-events-none px-4'>
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }} 
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="flex flex-col items-center gap-1 md:gap-2"
             >
               <h1 className='text-white/90 font-questrial text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
                 Making Brands <span className="font-baskerville italic text-white/70">Unskippable</span>
               </h1>
             </motion.div>
          </div>

          {/* Horizontal scrolling cards - Fixed Alignment */}
          <motion.div 
            style={{ x }} 
            className='flex gap-4 sm:gap-6 md:gap-12 lg:gap-16 px-4 sm:px-8 md:px-16 lg:px-20 w-fit items-center'
          >
            {videos.map((item, idx) => (
              <Card key={idx} item={item} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brands section */}
      <section className='relative z-20 w-full h-screen bg-black flex flex-col items-center justify-start gap-2 md:gap-6 px-6 md:px-12 overflow-hidden'>
        
        {/* Brands header */}
        <div className='w-full flex flex-col items-start justify-end pt-28 md:pt-32 pb-2 md:pb-4 shrink-0'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full border-b border-white/10 pb-4"
          >
            <h2 className='text-white/50 font-libre-franklin text-xs md:text-sm uppercase tracking-[0.3em] mb-2 ml-1'>
              Clientele
            </h2>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-questrial'>
              Brands We've <span className="font-baskerville italic text-white/80">Worked With</span>.
            </h1>
          </motion.div>
        </div>
        
        {/* Desktop Brands grid */}
        <div className='w-full hidden md:block flex-1 min-h-0 pb-10'>
          <motion.div 
            className='grid grid-cols-4 grid-rows-4 w-full h-full gap-1'
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
          >
            {brands.map((brand, idx) => (
              <motion.div 
                key={idx}
                className="w-full h-full"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
              >
                <Brands brand={brand} /> 
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Brands Rotator (3*1) */}
        <div className='w-full md:hidden flex flex-col gap-2 h-full max-h-[60vh] justify-center pb-20'>
          {visibleIndices.map((brandIndex, slotIndex) => (
            <div key={slotIndex} className="w-full flex-1 relative min-h-[80px]">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={brandIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Brands brand={brands[brandIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

const Card = ({ item }) => {
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { 
    threshold: 0.3, 
    margin: "-100px 0px" 
  });

  return (
    <motion.div
      ref={cardRef}
      className="pointer-events-auto shrink-0"
      initial={{ opacity: 0.6, scale: 0.95, filter: "blur(1px)" }}
      animate={{ 
        opacity: isInView ? 1 : 0.6,
        scale: isInView ? 1 : 0.95,
        filter: isInView ? "blur(0px)" : "blur(1px)"
      }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <ProjectScreen 
        videoSrc={item.src} 
        title={item.title}
        isInView={isInView}
      />
    </motion.div>
  )
}

export default Projects;