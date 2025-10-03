import type { Account } from './account';

/**
 * Props for the AccountCard component used in the carousel
 */
export interface AccountCardProps {
  account: Account;
  onClick?: (account: Account) => void;
  className?: string;
}

/**
 * Props for the AccountCarousel component
 */
export interface AccountCarouselProps {
  accounts: Account[];
  onAccountClick?: (account: Account) => void;
  className?: string;
  showControls?: boolean;
  showDots?: boolean;
}

/**
 * Props for the CarouselControls component
 */
export interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  className?: string;
}

/**
 * Props for the CarouselDots component
 */
export interface CarouselDotsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (slideIndex: number) => void;
  className?: string;
}

/**
 * Carousel configuration options
 */
export interface CarouselConfig {
  showControls: boolean;
  showDots: boolean;
  transitionDuration: number;
}

/**
 * Default carousel configuration
 */
export const DEFAULT_CAROUSEL_CONFIG: CarouselConfig = {
  showControls: true,
  showDots: true,
  transitionDuration: 300,
};