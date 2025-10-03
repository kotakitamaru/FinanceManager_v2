import type { CarouselControlsProps } from '@/types/carousel';
import './CarouselControls.css';

const CarouselControls: React.FC<CarouselControlsProps> = ({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  className = '',
}) => {
  return (
    <div className={`carousel-controls ${className}`}>
      <button
        className={`carousel-controls__button carousel-controls__button--previous ${
          !hasPrevious ? 'carousel-controls__button--disabled' : ''
        }`}
        onClick={onPrevious}
        disabled={!hasPrevious}
        aria-label="Previous categories"
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        className={`carousel-controls__button carousel-controls__button--next ${
          !hasNext ? 'carousel-controls__button--disabled' : ''
        }`}
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next categories"
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default CarouselControls;
