
/**
 * Calculate the total number of slides needed (always 1 item per slide)
 */
export const calculateTotalSlides = (totalItems: number): number => {
  return Math.max(1, totalItems);
};

/**
 * Calculate the transform value for carousel positioning with partial card visibility
 */
export const calculateTransform = (
  currentSlide: number,
  itemWidth: number,
  partialCardWidth: number = 60
): number => {
  // Calculate the center position for the current slide
  const slideCenter = currentSlide * itemWidth;
  
  // Calculate the offset to center the current slide and show partial cards
  const centerOffset = partialCardWidth;
  
  // Return negative transform to move the track left
  return -(slideCenter - centerOffset);
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
