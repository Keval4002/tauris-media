// Calculate responsive values for image stacking based on screen width
export const calculateImagePosition = (stackPosition, width, isComingFromLast) => {
  let scale, y, opacity;
  
  if (width >= 768) {
    // Desktop/Tablet stacking system
    scale = getDesktopScale(stackPosition, width);
    const offset = getDesktopOffset(width);
    
    if (isComingFromLast) {
      y = 0;
      opacity = 1;
    } else {
      y = stackPosition === 0 ? 0 : (-offset * stackPosition);
      opacity = stackPosition === 0 ? 1 : Math.max(0.4, 1 - 0.25 * stackPosition);
    }
  } else {
    // Mobile stacking system
    scale = getMobileScale(stackPosition, width);
    const offset = getMobileOffset(width);
    
    if (isComingFromLast) {
      y = 0;
      opacity = 1;
    } else {
      y = stackPosition === 0 ? 0 : (-offset * stackPosition);
      opacity = getMobileOpacity(stackPosition, width);
    }
  }
  
  const zIndex = stackPosition === 0 
    ? (isComingFromLast ? 35 : 30) 
    : Math.max(5, 30 - 8 * stackPosition);
  
  return { scale, y, opacity, zIndex };
};

const getDesktopScale = (position, width) => {
  if (position === 0) return 1;
  
  if (width >= 1024) {
    return Math.max(0.7, 1 - 0.15 * position);
  } else {
    return Math.max(0.75, 1 - 0.12 * position);
  }
};

const getDesktopOffset = (width) => {
  if (width >= 1536) return 40;
  if (width >= 1280) return 35;
  if (width >= 1024) return 30;
  return 25;
};

const getMobileScale = (position, width) => {
  if (position === 0) return 1;
  
  if (width >= 700) {
    return Math.max(0.70, 1 - 0.15 * position);
  } else if (width >= 600) {
    return Math.max(0.72, 1 - 0.14 * position);
  } else if (width >= 450) {
    return Math.max(0.75, 1 - 0.12 * position);
  } else {
    return Math.max(0.80, 1 - 0.10 * position);
  }
};

const getMobileOffset = (width) => {
  if (width >= 700) return 35;
  if (width >= 600) return 30;
  if (width >= 450) return 25;
  return 20;
};

const getMobileOpacity = (position, width) => {
  if (position === 0) return 1;
  if (width >= 600) {
    return Math.max(0.5, 1 - 0.2 * position);
  } else {
    return Math.max(0.6, 1 - 0.15 * position);
  }
};

export const getResponsiveSlideDistance = (width) => {
  if (width >= 768) {
    if (width >= 1536) return -200;
    if (width >= 1280) return -180;
    if (width >= 1024) return -160;
    return -140;
  } else {
    if (width >= 700) return -90;
    if (width >= 600) return -80;
    if (width >= 450) return -70;
    return -60;
  }
};

export const getStackPosition = (index, currentImageIndex, imagesLength) => {
  if (index === currentImageIndex) {
    return 0; // Front position
  }
  
  const previousFrontIndex = (currentImageIndex - 1 + imagesLength) % imagesLength;
  if (index === previousFrontIndex) {
    return 1; // Previous front image goes to second position
  }
  
  return 2; // All other images go to back position
};
