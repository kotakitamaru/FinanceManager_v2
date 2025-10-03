import React from 'react';
import type { Account } from '@/types/account';
import { formatCurrency } from '@/utils';
import './AccountCard.css';

interface AccountCardProps {
  account: Account;
  onClick?: (account: Account) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, onClick }) => {
  const handleClick = () => {
    onClick?.(account);
  };


  return (
    <div 
      className="account-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Account: ${account.title}, Balance: ${formatCurrency(account.balance)}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{
        '--account-color': account.color,
      } as React.CSSProperties}
    >
      <div className="account-card__icon">
        <span className="account-card__icon-symbol">{account.icon}</span>
      </div>
      <div className="account-card__content">
        <h3 className="account-card__title">{account.title}</h3>
        <p className="account-card__balance">{formatCurrency(account.balance)}</p>
      </div>
      <div className="account-card__arrow">
        <span>→</span>
      </div>
    </div>
  );
};

export default AccountCard;
