// Hero section configuration and data
import img1 from '../../assets/images/img-12.jpg';
import img2 from '../../assets/images/img-5.jpg';
import img3 from '../../assets/images/img-9.jpg';

export const HERO_CONFIG = {
  lockDuration: 900, // Hard lock duration - longer to ensure no double triggers
  scrollThreshold: { mobile: 60, desktop: 100 }, // Higher threshold to prevent accidental triggers
  idleResetTime: 300, // Time of no input to reset accumulated delta
  stickCount: { mobile: 16, desktop: 48 },
  animationDuration: 600, // Animation duration in ms
  textDelayDuration: 350, // Text animation delay
};

export const HERO_DATA = {
  images: [img1, img2, img3],
  colors: ["#311512", "#5e2c25", "#995435"],
  texts: [
    "Experience your brand amplified.",
    "Focus your growth story.",
    "Style your digital scale."
  ],
};

export const ANIMATION_EASING = {
  smooth: [0.33, 1, 0.68, 1], // Cubic-bezier for smooth deceleration
  materialStandard: [0.4, 0, 0.2, 1], // Material Design standard easing
  background: [0.25, 0.46, 0.45, 0.94],
};
