import React from 'react';
import type { Category } from '@/types/category';
import CategoryCard from './CategoryCard';
import './CategoryList.css';

interface CategoryListProps {
  categories: Category[];
  onCategoryClick?: (category: Category) => void;
  isLoading?: boolean;
  error?: string | null;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  onCategoryClick, 
  isLoading = false, 
  error = null 
}) => {
  if (isLoading) {
    return (
      <div className="category-list">
        <div className="category-list__loading">
          <div className="category-list__spinner"></div>
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-list">
        <div className="category-list__error">
          <p>Error loading categories: {error}</p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="category-list">
        <div className="category-list__empty">
          <p>No categories found. Create your first category to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="category-list">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={onCategoryClick}
        />
      ))}
    </div>
  );
};

export default CategoryList;
