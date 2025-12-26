import React from 'react';
import { motion } from 'framer-motion';
import { calculateImagePosition, getResponsiveSlideDistance, getStackPosition } from './utils/responsiveCalculations';
import { ANIMATION_EASING } from './constants';

export const ImageStack = ({ images, currentImageIndex, prevImageIndex, screenWidth }) => {
  return (
    <>
      {images.map((src, index) => {
        const isActive = index === currentImageIndex;
        const isComingFromLast = isActive && 
          currentImageIndex === 0 && prevImageIndex === images.length - 1;
        
        const stackPosition = getStackPosition(index, currentImageIndex, images.length);
        const { scale, y, opacity, zIndex } = calculateImagePosition(
          stackPosition, 
          screenWidth, 
          isComingFromLast && isActive
        );

        return (
          <motion.img
            key={index}
            src={src}
            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full'
            animate={{ y, scale, zIndex, opacity }}
            initial={isComingFromLast ? { 
              y: getResponsiveSlideDistance(screenWidth), 
              opacity: 0 
            } : false}
            transition={{ 
              y: { 
                duration: 0.6,
                ease: ANIMATION_EASING.smooth
              },
              scale: { 
                duration: 0.6, 
                ease: ANIMATION_EASING.smooth
              },
              opacity: { 
                duration: isComingFromLast ? 0.4 : 0.5,
                ease: ANIMATION_EASING.materialStandard
              },
              zIndex: { duration: 0.01, ease: "linear" }
            }}
          />
        );
      })}
    </>
  );
};
