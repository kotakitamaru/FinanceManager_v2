import React from 'react';
import type { Category } from '@/types/category';
import { formatCurrency } from '@/utils';
import './CategoryCard.css';

interface CategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const handleClick = () => {
    onClick?.(category);
  };

  return (
    <div 
      className="category-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Category: ${category.title}, Amount: ${formatCurrency(category.amount)}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{
        '--category-color': category.color,
      } as React.CSSProperties}
    >
      {/* Background with category color gradient */}
      <div className="category-card__background" />
      
      <div className="category-card__icon">
        <span className="category-card__icon-symbol">{category.icon}</span>
      </div>
      <div className="category-card__content">
        <h3 className="category-card__title">{category.title}</h3>
        <p className="category-card__amount">{formatCurrency(category.amount)}</p>
      </div>
      <div className="category-card__arrow">
        <span>→</span>
      </div>
    </div>
  );
};

export default CategoryCard;
