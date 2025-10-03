import React, { useState, useEffect } from 'react';
import { CategoryList } from '@components/categories';
import { categoryService } from '@/services';
import type { Category } from '@/types/category';
import './Categories.css';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await categoryService.getCategories();
        setCategories(response.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (_category: Category) => {
    // Placeholder for category click functionality
    // TODO: Navigate to category details or perform category-specific action
  };

  return (
    <div className="categories-page">
      <div className="categories-page__header">
        <h1 className="categories-page__title">Categories</h1>
        <p className="categories-page__subtitle">
          Manage your expense and income categories with transaction amounts
        </p>
      </div>
      
      <div className="categories-page__content">
        <CategoryList
          categories={categories}
          onCategoryClick={handleCategoryClick}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Categories;
