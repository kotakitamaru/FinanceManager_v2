import React from 'react';
import type { AccountCardProps } from '@/types/carousel';
import { formatCurrency } from '@/utils';
import './AccountCard.css';

const AccountCard: React.FC<AccountCardProps> = ({ 
  account, 
  onClick, 
  className = '' 
}) => {
  const handleClick = () => {
    onClick?.(account);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className={`carousel-account-card ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Account: ${account.title}, Balance: ${formatCurrency(account.balance)}`}
      style={{
        '--account-color': account.color,
      } as React.CSSProperties}
    >
      {/* Background with account color */}
      <div className="carousel-account-card__background" />
      
      {/* Icon positioned in top left */}
      <div className="carousel-account-card__icon">
        <span className="carousel-account-card__icon-symbol">
          {account.icon}
        </span>
      </div>
      
      {/* Title positioned in top right */}
      <div className="carousel-account-card__title">
        {account.title}
      </div>
      
      {/* Balance positioned in bottom right */}
      <div className="carousel-account-card__balance">
        {formatCurrency(account.balance)}
      </div>
    </div>
  );
};

export default AccountCard;
