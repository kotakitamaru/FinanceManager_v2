import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { AccountCarouselProps } from '@/types/carousel';
import AccountCard from './AccountCard';
import CarouselControls from './CarouselControls';
import CarouselDots from './CarouselDots';
import {
  calculateTotalSlides,
  calculateTransform,
  clamp,
  debounce,
  throttle,
} from '@/utils/carouselUtils';
import { DEFAULT_CAROUSEL_CONFIG } from '@/types/carousel';
import './AccountCarousel.css';

const AccountCarousel: React.FC<AccountCarouselProps> = ({
  accounts,
  onAccountClick,
  className = '',
  showControls = DEFAULT_CAROUSEL_CONFIG.showControls,
  showDots = DEFAULT_CAROUSEL_CONFIG.showDots,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate responsive values - show 1 full item + partial adjacent items
  const totalSlides = calculateTotalSlides(accounts.length);
  // Make cards wider on mobile by reducing partial card visibility
  const partialCardWidth = isMobile ? 30 : 60; // Width of partial card visibility in pixels
  const itemWidth = containerWidth > 0 ? containerWidth - (2 * partialCardWidth) : 0;

  // Debounced resize handler
  const handleResize = useCallback(
    debounce(() => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        setIsMobile(window.innerWidth <= 768);
      }
    }, 150),
    []
  );

  // Throttled slide change handler
  const changeSlide = useCallback(
    throttle((newSlide: number) => {
      const clampedSlide = clamp(newSlide, 0, totalSlides - 1);
      if (clampedSlide !== currentSlide) {
        setCurrentSlide(clampedSlide);
      }
    }, 100),
    [currentSlide, totalSlides]
  );

  // Navigation functions
  const goToPrevious = useCallback(() => {
    changeSlide(currentSlide - 1);
  }, [currentSlide, changeSlide]);

  const goToNext = useCallback(() => {
    changeSlide(currentSlide + 1);
  }, [currentSlide, changeSlide]);

  const goToSlide = useCallback((slideIndex: number) => {
    changeSlide(slideIndex);
  }, [changeSlide]);

  // Resize observer
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setIsMobile(window.innerWidth <= 768);
      
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(containerRef.current);
      
      return () => resizeObserver.disconnect();
    }
  }, [handleResize]);

  // Reset slide when accounts change
  useEffect(() => {
    setCurrentSlide(0);
  }, [accounts.length]);

  if (accounts.length === 0) {
    return (
      <div className={`carousel-empty ${className}`}>
        <p>No accounts available</p>
      </div>
    );
  }

  const transform = calculateTransform(currentSlide, itemWidth, partialCardWidth);

  return (
    <div className={`account-carousel ${className}`}>
      {showDots && totalSlides > 1 && (
        <CarouselDots
          totalSlides={totalSlides}
          currentSlide={currentSlide}
          onSlideChange={goToSlide}
        />
      )}

      <div
        ref={containerRef}
        className="account-carousel__container"
      >
        <div
          className="account-carousel__track"
          style={{
            transform: `translateX(${transform}px)`,
            width: `${(accounts.length * itemWidth + 2 * partialCardWidth)}px`,
          }}
        >
          {accounts.map((account) => (
            <div
              key={account.id}
              className="account-carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <AccountCard
                account={account}
                onClick={onAccountClick}
              />
            </div>
          ))}
        </div>
      </div>

      {showControls && totalSlides > 1 && (
        <CarouselControls
          onPrevious={goToPrevious}
          onNext={goToNext}
          hasPrevious={currentSlide > 0}
          hasNext={currentSlide < totalSlides - 1}
        />
      )}
    </div>
  );
};

export default AccountCarousel;
