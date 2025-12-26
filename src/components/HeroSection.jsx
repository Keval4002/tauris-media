import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageStack } from './HeroSection/ImageStack';
import { TextOverlay } from './HeroSection/TextOverlay';
import { ProgressIndicator } from './HeroSection/ProgressIndicator';
import { useScreenSize } from './HeroSection/hooks/useScreenSize';
import { useHeroScroll } from './HeroSection/hooks/useHeroScroll';
import { HERO_DATA, HERO_CONFIG, ANIMATION_EASING } from './HeroSection/constants';
import { FiArrowUpRight } from 'react-icons/fi';

const NARRATIVE_TEXTS = [
  "Timeless Elegance",
  "Visual Narrative",
  "Global Resonance"
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { isMobile, screenWidth } = useScreenSize();
  
  useHeroScroll({
    isInitialized,
    isMobile,
    imagesLength: HERO_DATA.images.length,
    setCurrentImageIndex,
    setPrevImageIndex
  });
  
  const activeText = NARRATIVE_TEXTS[currentImageIndex % NARRATIVE_TEXTS.length];

  const stickCount = isMobile ? HERO_CONFIG.stickCount.mobile : HERO_CONFIG.stickCount.desktop;
  const bgIndex = Math.min(Math.max(currentImageIndex, 0), HERO_DATA.images.length - 1);

  useEffect(() => {
    setCurrentImageIndex(0);
    setPrevImageIndex(0);
    
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    
    return () => clearTimeout(initTimer);
  }, []);

  return (
    <motion.section
      className='fixed top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center z-10'
      animate={{ backgroundColor: HERO_DATA.colors[bgIndex] }}
      transition={{ 
        backgroundColor: { 
          duration: 1.2, 
          ease: ANIMATION_EASING.background, 
          delay: 0.2 
        } 
      }}
    >
      {/* --- 1. Index Indicator (Top Left) --- */}
      <div className='absolute left-5 top-24 md:left-12 md:top-32 z-20 pointer-events-none'>
          <h3 className='text-sm md:text-lg text-[#e7dace] font-light font-manrope'>
            [ 0{currentImageIndex+1} ]
          </h3>
      </div>

      {/* --- 2. Adaptive Scroll Indicator (Top Right) --- */}
      {/* Mobile: flex-row (Text left, Line right)
         Desktop: flex-col (Text top, Line bottom) 
      */}
      <div className='absolute right-5 top-24 md:right-12 md:top-32 z-20 pointer-events-none flex flex-row items-center md:flex-col md:items-end gap-2'>
          <h3 className='text-sm md:text-lg text-[#e7dace] font-light font-manrope tracking-wide'>
            Scroll
          </h3>
          
          {/* Line Container: Horizontal (w-12 h-px) on Mobile, Vertical (w-px h-12) on Desktop */}
          <div className='relative bg-[#e7dace]/30 overflow-hidden w-8 h-[1px] md:w-[1px] md:h-12'>
            <motion.div 
              className='absolute bg-[#e7dace]'
              // Switch animation based on screen size
              style={{
                top: 0,
                left: 0,
                width: isMobile ? "100%" : "100%", 
                height: isMobile ? "100%" : "100%" 
              }}
              animate={isMobile 
                ? { width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] } // Horizontal Anim
                : { height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }   // Vertical Anim
              }
              transition={{ 
                duration: 2, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatDelay: 0.5 
              }}
            />
          </div>
      </div>

      {/* --- 3. Email Link (Bottom Left) --- */}
      <motion.a 
        href="mailto:tauris.media@gmail.com"
        className='absolute left-5 bottom-20 md:bottom-12 z-20 cursor-pointer group'
        initial="initial"
        whileHover="hover"
      >
        <div className='flex items-center gap-1'>
          <div className='relative'>
            {/* Reduced text size for mobile (text-xs) */}
            <h3 className='text-xs md:text-sm text-[#e7dace] font-light font-manrope'>
              tauris.media@gmail.com
            </h3>
            
            <motion.span
              className='absolute bottom-0 left-0 h-[1px] bg-[#e7dace] w-full origin-right'
              variants={{
                initial: { scaleX: 1 }, 
                hover: { 
                  scaleX: 0, 
                  transition: { duration: 0.3, ease: "easeOut" } 
                }
              }}
            />
          </div>

          <motion.div
            variants={{
              initial: { x: 0, y: 0, opacity: 0.7 },
              hover: { x: 2, y: -2, opacity: 1 }
            }}
            transition={{ duration: 0.2 }}
          >
            <FiArrowUpRight className='text-[#e7dace] text-sm md:text-xl' />
          </motion.div>
        </div>
      </motion.a>

      {/* --- 4. Narrative Text (Bottom Right) --- */}
      <div className='absolute right-5 bottom-20 md:bottom-12 z-20 pointer-events-none overflow-hidden h-auto min-h-[30px] flex items-end justify-end'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeText} 
            className='flex flex-col items-end'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            {/* Reduced text size for mobile (text-xs) to match Email */}
            <h3 className='text-xs md:text-lg text-[#e7dace] font-light font-manrope text-right'>
              {activeText}
            </h3>
            
            <motion.span 
              className='h-[1px] bg-[#e7dace] opacity-60'
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Main Image Stack Container --- */}
      <div className="image-stack-container relative
        w-[calc(100vw-2rem)] mx-4 aspect-[1.77/1]
        sm:w-[calc(100vw-3rem)] sm:mx-6
        md:w-[500px] md:h-[282px] md:mx-auto md:aspect-auto
        lg:w-[600px] lg:h-[339px] lg:mx-auto lg:aspect-auto
        xl:w-[700px] xl:h-[395px]
        2xl:w-[785px] 2xl:h-[443px]">
        
        <ImageStack 
          images={HERO_DATA.images}
          currentImageIndex={currentImageIndex}
          prevImageIndex={prevImageIndex}
          screenWidth={screenWidth}
        />

        <TextOverlay 
          texts={HERO_DATA.texts}
          currentImageIndex={currentImageIndex}
          isInitialized={isInitialized}
        />

        <ProgressIndicator 
          stickCount={stickCount}
          currentImageIndex={currentImageIndex}
          totalImages={HERO_DATA.images.length}
        />
      </div>
    </motion.section>
  );
};

export default HeroSection;