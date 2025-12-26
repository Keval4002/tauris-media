import { useRef, useCallback, useEffect } from 'react';
import { HERO_CONFIG } from '../constants';

export const useHeroScroll = ({
  isInitialized,
  isMobile,
  imagesLength,
  setCurrentImageIndex,
  setPrevImageIndex
}) => {
  const scrollStateRef = useRef({
    lastChangeTime: 0,
    isLocked: false,
    accumulatedDelta: 0,
    lastWheelTime: 0,
    lastTouchY: null,
    isInitialized: false,
  });

  const scrollThreshold = isMobile ? HERO_CONFIG.scrollThreshold.mobile : HERO_CONFIG.scrollThreshold.desktop;

  // Handle image change - lock is already set by caller
  const changeImage = useCallback((direction) => {
    const state = scrollStateRef.current;
    
    // Double-check lock (should already be set by caller)
    if (!state.isLocked) {
      state.isLocked = true;
    }
    
    state.lastChangeTime = Date.now();
    state.accumulatedDelta = 0;
    state.lastTouchY = null;
    
    // Update image index
    if (direction > 0) {
      setCurrentImageIndex(prev => {
        setPrevImageIndex(prev);
        return (prev + 1) % imagesLength;
      });
    } else {
      setCurrentImageIndex(prev => {
        setPrevImageIndex(prev);
        return prev === 0 ? imagesLength - 1 : prev - 1;
      });
    }
    
    // Release lock after animation completes
    setTimeout(() => {
      state.isLocked = false;
      state.accumulatedDelta = 0;
      state.lastTouchY = null;
    }, HERO_CONFIG.lockDuration);
    
    return true;
  }, [imagesLength, setCurrentImageIndex, setPrevImageIndex]);

  // Wheel event handler (desktop)
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleWheel = (e) => {
      e.preventDefault();
      
      const state = scrollStateRef.current;
      
      if (state.isLocked) return;
      
      const now = Date.now();
      const timeSinceLastWheel = now - state.lastWheelTime;
      
      if (timeSinceLastWheel > HERO_CONFIG.idleResetTime) {
        state.accumulatedDelta = 0;
      }
      state.lastWheelTime = now;
      
      const normalizedDelta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 50);
      state.accumulatedDelta += normalizedDelta;
      
      if (Math.abs(state.accumulatedDelta) >= scrollThreshold) {
        state.isLocked = true;
        const direction = state.accumulatedDelta > 0 ? 1 : -1;
        state.accumulatedDelta = 0;
        changeImage(direction);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isInitialized, scrollThreshold, changeImage]);

  // Touch event handlers (mobile)
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleTouchStart = (e) => {
      const state = scrollStateRef.current;
      if (state.isLocked) return;
      
      state.lastTouchY = e.touches[0].clientY;
      state.accumulatedDelta = 0;
    };
    
    const handleTouchMove = (e) => {
      const state = scrollStateRef.current;
      
      if (state.isLocked || state.lastTouchY === null) {
        e.preventDefault();
        return;
      }
      
      const currentY = e.touches[0].clientY;
      const deltaY = state.lastTouchY - currentY;
      
      state.accumulatedDelta += deltaY;
      state.lastTouchY = currentY;
      
      if (Math.abs(state.accumulatedDelta) >= scrollThreshold) {
        state.isLocked = true;
        const direction = state.accumulatedDelta > 0 ? 1 : -1;
        state.accumulatedDelta = 0;
        state.lastTouchY = null;
        e.preventDefault();
        changeImage(direction);
      }
    };
    
    const handleTouchEnd = () => {
      const state = scrollStateRef.current;
      if (!state.isLocked) {
        state.lastTouchY = null;
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

  // Keyboard navigation support
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleKeyDown = (e) => {
      const state = scrollStateRef.current;
      
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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInitialized, changeImage]);

  // Initialize scroll state
  useEffect(() => {
    scrollStateRef.current = {
      lastChangeTime: 0,
      isLocked: false,
      accumulatedDelta: 0,
      lastWheelTime: 0,
      lastTouchY: null,
      isInitialized: false,
    };
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    const initTimer = setTimeout(() => {
      scrollStateRef.current.isInitialized = true;
    }, 100);
    
    return () => {
      clearTimeout(initTimer);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return { scrollStateRef };
};
