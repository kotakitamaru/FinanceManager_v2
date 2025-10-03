import React from 'react';
import type { NavButtonProps } from '@/types';
import './NavButton.css';

const NavButton: React.FC<NavButtonProps> = ({ 
  icon, 
  text, 
  isActive, 
  onClick, 
  'aria-label': ariaLabel 
}) => {
  return (
    <button
      className={`nav-button ${isActive ? 'nav-button--active' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel || text}
      type="button"
    >
      <div className="nav-button__icon">
        {icon}
      </div>
      <span className="nav-button__text">
        {text}
      </span>
    </button>
  );
};

export default NavButton;

