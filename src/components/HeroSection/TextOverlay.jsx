import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_EASING, HERO_CONFIG } from './constants';

export const TextOverlay = ({ texts, currentImageIndex, isInitialized }) => {
  return (
    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-40 w-full text-center">
      {texts.map((text, index) => {
        const isActive = index === currentImageIndex;
        
        return (
          <motion.div
            key={index}
            className="absolute w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16"
            initial={{ 
              opacity: index === 0 ? 1 : 0, 
              y: index === 0 ? 0 : 15 
            }}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 15,
            }}
            transition={{
              duration: 0.5,
              ease: ANIMATION_EASING.smooth,
              delay: isActive && isInitialized ? HERO_CONFIG.textDelayDuration / 1000 : 0
            }}
          >
            <p className="text-white font-medium 
              text-xl md:text-2xl lg:text-3xl
              drop-shadow-lg 
              leading-tight xs:leading-snug sm:leading-normal md:leading-relaxed
              tracking-wide xs:tracking-wider sm:tracking-widest
              max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-2xl
              mx-auto font-cormorant">
              {text}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};
