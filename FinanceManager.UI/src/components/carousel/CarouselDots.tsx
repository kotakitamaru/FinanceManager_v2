import type { CarouselDotsProps } from '@/types/carousel';
import './CarouselDots.css';

const CarouselDots: React.FC<CarouselDotsProps> = ({
  totalSlides,
  currentSlide,
  onSlideChange,
  className = '',
}) => {
  return (
    <div className={`carousel-dots ${className}`}>
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          className={`carousel-dots__dot ${
            index === currentSlide ? 'carousel-dots__dot--active' : ''
          }`}
          onClick={() => onSlideChange(index)}
          aria-label={`Go to slide ${index + 1}`}
          type="button"
        />
      ))}
    </div>
  );
};

export default CarouselDots;
