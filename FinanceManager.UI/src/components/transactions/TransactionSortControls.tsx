import React, { useState } from 'react';
import type { SortField, SortOrder } from '@/types/transaction';
import { getSortFieldOptions } from '@/utils/transactionSorting';
import './TransactionSortControls.css';

interface TransactionSortControlsProps {
  sortBy: SortField;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortField, sortOrder: SortOrder) => void;
  loading?: boolean;
  className?: string;
}

const TransactionSortControls: React.FC<TransactionSortControlsProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
  loading = false,
  className = ''
}) => {
  const [isFieldDropdownOpen, setIsFieldDropdownOpen] = useState(false);

  const fieldOptions = getSortFieldOptions();

  const handleFieldChange = (newSortBy: SortField) => {
    setIsFieldDropdownOpen(false);
    onSortChange(newSortBy, sortOrder);
  };

  const handleOrderToggle = () => {
    const newSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    onSortChange(sortBy, newSortOrder);
  };

  const handleFieldKeyDown = (e: React.KeyboardEvent, option: SortField) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFieldChange(option);
    }
  };

  const handleOrderToggleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOrderToggle();
    }
  };

  const toggleFieldDropdown = () => {
    if (!loading) {
      setIsFieldDropdownOpen(!isFieldDropdownOpen);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.transaction-sort-controls')) {
        setIsFieldDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentFieldLabel = fieldOptions.find(option => option.value === sortBy)?.label || sortBy;
  const isAscending = sortOrder === 'ASC';

  return (
    <div className={`transaction-sort-controls ${className}`}>
      <div className="transaction-sort-controls__label">Sort by:</div>
      
      <div className="transaction-sort-controls__controls">
        {/* Sort Field Dropdown */}
        <div className="transaction-sort-controls__dropdown">
          <button
            className={`transaction-sort-controls__dropdown-button ${
              isFieldDropdownOpen ? 'transaction-sort-controls__dropdown-button--open' : ''
            }`}
            onClick={toggleFieldDropdown}
            disabled={loading}
            type="button"
            aria-expanded={isFieldDropdownOpen}
            aria-haspopup="listbox"
            aria-label={`Sort field: ${currentFieldLabel}`}
          >
            <span className="transaction-sort-controls__dropdown-text">
              {currentFieldLabel}
            </span>
            <span className="transaction-sort-controls__dropdown-arrow">
              {isFieldDropdownOpen ? '▲' : '▼'}
            </span>
          </button>
          
          {isFieldDropdownOpen && (
            <ul 
              className="transaction-sort-controls__dropdown-menu"
              role="listbox"
              aria-label="Sort field options"
            >
              {fieldOptions.map((option) => (
                <li key={option.value}>
                  <button
                    className={`transaction-sort-controls__dropdown-item ${
                      option.value === sortBy ? 'transaction-sort-controls__dropdown-item--selected' : ''
                    }`}
                    onClick={() => handleFieldChange(option.value)}
                    onKeyDown={(e) => handleFieldKeyDown(e, option.value)}
                    type="button"
                    role="option"
                    aria-selected={option.value === sortBy}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sort Order Toggle Switch */}
        <div className="transaction-sort-controls__toggle">
          <span className="transaction-sort-controls__toggle-label">
            {isAscending ? 'Ascending' : 'Descending'}
          </span>
          <button
            className={`transaction-sort-controls__toggle-switch ${
              isAscending ? 'transaction-sort-controls__toggle-switch--ascending' : 'transaction-sort-controls__toggle-switch--descending'
            }`}
            onClick={handleOrderToggle}
            onKeyDown={handleOrderToggleKeyDown}
            disabled={loading}
            type="button"
            aria-label={`Sort order: ${isAscending ? 'Ascending' : 'Descending'}. Click to toggle.`}
            aria-pressed={isAscending}
          >
            <span className="transaction-sort-controls__toggle-slider">
              <span className="transaction-sort-controls__toggle-icon">
                {isAscending ? '↑' : '↓'}
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="transaction-sort-controls__loading">
          <div className="transaction-sort-controls__loading-spinner" />
        </div>
      )}
    </div>
  );
};

export default TransactionSortControls;
