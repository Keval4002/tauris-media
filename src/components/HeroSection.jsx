import React from 'react'
import { motion } from "framer-motion"

const HeroSection = () => {
    // Use refs for values that shouldn't trigger re-renders
    const scrollStateRef = React.useRef({
        lastChangeTime: 0,
        isLocked: false, // Hard lock during transitions - prevents ALL input
        accumulatedDelta: 0,
        lastWheelTime: 0,
        lastTouchY: null,
        isInitialized: false,
    });
    
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [prevImageIndex, setPrevImageIndex] = React.useState(0);
    const [isInitialized, setIsInitialized] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(() => 
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );
    const [screenWidth, setScreenWidth] = React.useState(() =>
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );
    
    // Configuration - tuned for absolutely no skips
    const lockDuration = 800; // Hard lock duration - no input accepted during this time
    const scrollThreshold = isMobile ? 50 : 70; // Threshold to trigger change
    const idleResetTime = 250; // Time of no input to reset accumulated delta
    
    // Check screen size for responsive stick count
    React.useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
            setScreenWidth(window.innerWidth);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    
    const stickCount = isMobile ? 16 : 48;
    
    const images = ["/New folder/img-12.jpg", "/New folder/img-5.jpg", "/New folder/img-9.jpg"];
    const colors = ["#311512", "#5e2c25", "#995435"];
    const texts = ["Experience your brand amplified.", "Focus your growth story.", "Style your digital scale."];

    // Handle image change - with hard lock to prevent any skips
    const changeImage = React.useCallback((direction) => {
        const state = scrollStateRef.current;
        
        // If locked, reject immediately - no exceptions
        if (state.isLocked) {
            return false;
        }
        
        // Engage hard lock immediately
        state.isLocked = true;
        state.lastChangeTime = Date.now();
        state.accumulatedDelta = 0;
        
        // Update image index
        if (direction > 0) {
            setCurrentImageIndex(prev => {
                setPrevImageIndex(prev);
                return (prev + 1) % images.length;
            });
        } else {
            setCurrentImageIndex(prev => {
                setPrevImageIndex(prev);
                return prev === 0 ? images.length - 1 : prev - 1;
            });
        }
        
        // Release lock after animation completes
        setTimeout(() => {
            state.isLocked = false;
            state.accumulatedDelta = 0;
        }, lockDuration);
        
        return true;
    }, [images.length, lockDuration]);

    // Wheel event handler (desktop) - simplified and bulletproof
    React.useEffect(() => {
        if (!isInitialized) return;
        
        const handleWheel = (e) => {
            e.preventDefault();
            
            const state = scrollStateRef.current;
            
            // If locked, ignore completely
            if (state.isLocked) {
                return;
            }
            
            const now = Date.now();
            const timeSinceLastWheel = now - state.lastWheelTime;
            
            // Reset accumulated delta if user stopped scrolling
            if (timeSinceLastWheel > idleResetTime) {
                state.accumulatedDelta = 0;
            }
            state.lastWheelTime = now;
            
            // Normalize delta - cap extreme values from fast scrolling
            const normalizedDelta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 80);
            
            // Accumulate delta
            state.accumulatedDelta += normalizedDelta;
            
            // Check if threshold is reached
            if (Math.abs(state.accumulatedDelta) >= scrollThreshold) {
                const direction = state.accumulatedDelta > 0 ? 1 : -1;
                changeImage(direction);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [isInitialized, scrollThreshold, changeImage, idleResetTime]);

    // Touch event handlers (mobile) - simplified and bulletproof
    React.useEffect(() => {
        if (!isInitialized) return;
        
        const handleTouchStart = (e) => {
            const state = scrollStateRef.current;
            if (state.isLocked) return;
            
            state.lastTouchY = e.touches[0].clientY;
            state.accumulatedDelta = 0;
        };
        
        const handleTouchMove = (e) => {
            const state = scrollStateRef.current;
            
            // If locked or no touch start, ignore
            if (state.isLocked || state.lastTouchY === null) {
                if (state.isLocked) e.preventDefault();
                return;
            }
            
            const currentY = e.touches[0].clientY;
            const deltaY = state.lastTouchY - currentY;
            
            state.accumulatedDelta += deltaY;
            state.lastTouchY = currentY;
            
            // Check if threshold is reached
            if (Math.abs(state.accumulatedDelta) >= scrollThreshold) {
                const direction = state.accumulatedDelta > 0 ? 1 : -1;
                e.preventDefault();
                changeImage(direction);
            }
        };
        
        const handleTouchEnd = () => {
            const state = scrollStateRef.current;
            state.lastTouchY = null;
            if (!state.isLocked) {
                state.accumulatedDelta = 0;
            }
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isInitialized, scrollThreshold, changeImage]);

    // Keyboard navigation support - with same lock protection
    React.useEffect(() => {
        if (!isInitialized) return;
        
        const handleKeyDown = (e) => {
            const state = scrollStateRef.current;
            
            // Prevent key repeat and check lock
            if (e.repeat || state.isLocked) return;
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                changeImage(1);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                changeImage(-1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isInitialized, changeImage]);

    const bgIndex = Math.min(Math.max(currentImageIndex, 0), images.length - 1);

    // Initialize component - only runs once on mount
    React.useEffect(() => {
        setCurrentImageIndex(0);
        setPrevImageIndex(0);
        
        // Reset scroll state ref
        scrollStateRef.current = {
            lastChangeTime: 0,
            isLocked: false,
            accumulatedDelta: 0,
            lastWheelTime: 0,
            lastTouchY: null,
            isInitialized: false,
        };
        
        // Prevent default scroll behavior
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        const initTimer = setTimeout(() => {
            setIsInitialized(true);
            scrollStateRef.current.isInitialized = true;
        }, 100);
        
        return () => {
            clearTimeout(initTimer);
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);
    
  return (
    <>
      {/* Fixed hero section that stays in place */}
      <motion.section
        className='fixed top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center z-10'
        animate={{ backgroundColor: colors[bgIndex] }}
        transition={{ backgroundColor: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 } }}
      >
        {/* Responsive image container */}
        <div className="image-stack-container relative
          w-[calc(100vw-2rem)] mx-4 aspect-[1.77/1]
          sm:w-[calc(100vw-3rem)] sm:mx-6
          md:w-[500px] md:h-[282px] md:mx-auto md:aspect-auto
          lg:w-[600px] lg:h-[339px] lg:mx-auto lg:aspect-auto
          xl:w-[700px] xl:h-[395px]
          2xl:w-[785px] 2xl:h-[443px]">

        {images.map((src, index) => {
          const isActive = index === currentImageIndex;
          
          // Check if this image is transitioning from last position to front
          // This happens when we move from the last image (images.length - 1) to the first (0)
          const isComingFromLast = isActive && 
            currentImageIndex === 0 && prevImageIndex === images.length - 1;
          
          // Simple stack logic: assign positions relative to current image
          let stackPosition;
          if (isActive) {
            stackPosition = 0; // Front position
          } else {
            // For the previous image (the one that was just in front), put it at position 1
            const previousFrontIndex = (currentImageIndex - 1 + images.length) % images.length;
            if (index === previousFrontIndex) {
              stackPosition = 1; // Previous front image goes to second position
            } else {
              stackPosition = 2; // All other images go to back position
            }
          }
          
          // Separate stacking systems for different screen sizes - use state for consistency
          const width = screenWidth;
          let scale, y, opacity;
          
          if (width >= 768) {
            // Desktop/Tablet stacking system (768px+)
            const getDesktopScale = (position) => {
              if (position === 0) return 1;
              
              if (width >= 1024) {
                return Math.max(0.7, 1 - 0.15 * position);
              } else {
                return Math.max(0.75, 1 - 0.12 * position);
              }
            };
            
            const getDesktopOffset = () => {
              if (width >= 1536) return 40;
              if (width >= 1280) return 35;
              if (width >= 1024) return 30;
              return 25;
            };
            
            scale = getDesktopScale(stackPosition);
            
            if (isComingFromLast && isActive) {
              y = 0;
              opacity = 1;
            } else {
              y = stackPosition === 0 ? 0 : (-getDesktopOffset() * stackPosition);
              opacity = stackPosition === 0 ? 1 : Math.max(0.4, 1 - 0.25 * stackPosition);
            }
            
          } else {
            // Mobile stacking system (below 768px) - optimized with granular breakpoints
            const getMobileScale = (position) => {
              if (position === 0) return 1;
              
              if (width >= 700) {
                // Near tablet range: more pronounced stacking
                return Math.max(0.70, 1 - 0.15 * position);
              } else if (width >= 600) {
                // Medium mobile: balanced stacking
                return Math.max(0.72, 1 - 0.14 * position);
              } else if (width >= 450) {
                // Small mobile: moderate stacking (perfect around 550px)
                return Math.max(0.75, 1 - 0.12 * position);
              } else {
                // Very small mobile: subtle stacking (for around 350px)
                return Math.max(0.80, 1 - 0.10 * position);
              }
            };
            
            const getMobileOffset = () => {
              if (width >= 700) return 35; // Near tablet: much larger offset for clear visibility
              if (width >= 600) return 30; // Medium mobile: increased visibility
              if (width >= 450) return 25; // Small mobile: clear stacking
              return 20; // Very small mobile: visible but not excessive
            };
            
            const getMobileOpacity = (position) => {
              if (position === 0) return 1;
              if (width >= 600) {
                // Larger mobiles: standard opacity reduction
                return Math.max(0.5, 1 - 0.2 * position);
              } else {
                // Smaller mobiles: more visible background images
                return Math.max(0.6, 1 - 0.15 * position);
              }
            };
            
            scale = getMobileScale(stackPosition);
            
            if (isComingFromLast && isActive) {
              y = 0;
              opacity = 1;
            } else {
              y = stackPosition === 0 ? 0 : (-getMobileOffset() * stackPosition);
              opacity = getMobileOpacity(stackPosition);
            }
          }
          
          const zIndex = stackPosition === 0 ? (isComingFromLast ? 35 : 30) : Math.max(5, 30 - 8 * stackPosition);

          // Responsive slide distance for coming-from-last effect
          const responsiveSlideDistance = () => {
            if (width >= 768) {
              // Desktop system slide distances
              if (width >= 1536) return -200;
              if (width >= 1280) return -180;
              if (width >= 1024) return -160;
              return -140;
            } else {
              // Mobile system slide distances - granular breakpoints
              if (width >= 700) return -90;  // Near tablet
              if (width >= 600) return -80;  // Medium mobile
              if (width >= 450) return -70;  // Small mobile
              return -60; // Very small mobile
            }
          };

          return (
            <motion.img
              key={index}
              src={src}
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full'
              animate={{ 
                y,
                scale, 
                zIndex, 
                opacity
              }}
              initial={isComingFromLast ? { y: responsiveSlideDistance(), opacity: 0 } : false}
              transition={{ 
                y: { 
                  duration: 0.6,
                  ease: [0.33, 1, 0.68, 1] // Cubic-bezier for smooth deceleration
                },
                scale: { 
                  duration: 0.6, 
                  ease: [0.33, 1, 0.68, 1]
                },
                opacity: { 
                  duration: isComingFromLast ? 0.4 : 0.5,
                  ease: [0.4, 0, 0.2, 1] // Material Design standard easing
                },
                zIndex: { duration: 0.01, ease: "linear" }
              }}
            />
          )
        })}

        {/* Text overlays for each image */}
        <div className="absolute 
          -bottom-2
          left-1/2 -translate-x-1/2 z-40 w-full text-center">
          {texts.map((text, index) => {
            const isActive = index === currentImageIndex;
            
            return (
              <motion.div
                key={index}
                className="absolute w-full 
                  px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16"
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
                  ease: [0.33, 1, 0.68, 1],
                  delay: isActive && isInitialized ? 0.35 : 0
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
            )
          })}
        </div>

        {/* Horizontal progress line */}
        <div className="fixed bottom-4 left-0 w-screen z-50">
          <div className="flex items-center w-full px-4">
            <div className="flex items-center justify-evenly w-full">
              {/* Progress sticks - section 1 */}
              {Array.from({ length: stickCount }).map((_, index) => (
                <div
                  key={index}
                  className="h-2 w-px transition-all duration-500 ease-in-out"
                  style={{ 
                    backgroundColor: '#f1e6d2',
                    opacity: 0.6
                  }}
                />
              ))}
              
              {/* First counter */}
              <div className={`text-lg sm:text-xl font-light text-center transition-colors duration-300 font-cormorant ${
                currentImageIndex === 0 ? 'text-sticks' : 'text-white'
              }`}>
                [01]
              </div>
              
              {/* Progress sticks - section 2 */}
              {Array.from({ length: stickCount }).map((_, index) => (
                <div
                  key={index + stickCount}
                  className="h-2 w-px transition-all duration-500 ease-in-out"
                  style={{ 
                    backgroundColor: '#f1e6d2',
                    opacity: 0.6
                  }}
                />
              ))}
              
              {/* Second counter */}
              <div className={`text-lg sm:text-xl font-light text-center transition-colors duration-300 font-cormorant ${
                currentImageIndex === 1 ? 'text-sticks' : 'text-white'
              }`}>
                [02]
              </div>
              
              {/* Progress sticks - section 3 */}
              {Array.from({ length: stickCount }).map((_, index) => (
                <div
                  key={index + stickCount * 2}
                  className="h-2 w-px transition-all duration-500 ease-in-out"
                  style={{ 
                    backgroundColor: '#f1e6d2',
                    opacity: 0.6
                  }}
                />
              ))}
              
              {/* Third counter */}
              <div className={`text-lg sm:text-xl font-light text-center transition-colors duration-300 font-cormorant ${
                currentImageIndex === 2 ? 'text-sticks' : 'text-white'
              }`}>
                [03]
              </div>
              
              {/* Final progress sticks */}
              {Array.from({ length: stickCount }).map((_, index) => (
                <div
                  key={index + stickCount * 3}
                  className="h-2 w-px transition-all duration-500 ease-in-out"
                  style={{ 
                    backgroundColor: '#f1e6d2',
                    opacity: 0.6
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        </div> {/* Close image-stack-container */}

      </motion.section>
    </>
  )
}

export default HeroSection
