import React from 'react';
import type { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/utils';
import { formatTransactionDate, getTransactionAmountColor, getCategoryIcon, getCategoryColor } from '@/utils/transactionUtils';
import './TransactionItem.css';

interface TransactionItemProps {
  transaction: Transaction;
  onClick?: (transaction: Transaction) => void;
  className?: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onClick,
  className = ''
}) => {
  // Get category from transaction object
  const category = transaction.category;
  
  
  const handleClick = () => {
    onClick?.(transaction);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };


  return (
    <div 
      className={`transaction-item ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Transaction: ${transaction.note}, Amount: ${formatCurrency(typeof transaction.amount === 'string' ? parseFloat(transaction.amount) : transaction.amount)}`}
      style={{
        '--category-color': getCategoryColor(category),
        '--amount-color': getTransactionAmountColor(category?.isIncome ?? false),
      } as React.CSSProperties}
    >
      {/* Category Icon */}
      <div className="transaction-item__icon">
        <span className="transaction-item__icon-symbol">
          {getCategoryIcon(category)}
        </span>
      </div>

      {/* Transaction Details */}
      <div className="transaction-item__details">
        <div className="transaction-item__description">
          {transaction.note}
        </div>
        <div className="transaction-item__meta">
          <span className="transaction-item__date">
            {formatTransactionDate(transaction.date)}
          </span>
          {category && (
            <span className="transaction-item__category">
              {category.title}
            </span>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="transaction-item__amount">
        <span className={`transaction-item__amount-value ${category?.isIncome ? 'income' : 'expense'}`}>
          {(() => {
            const isIncome = category?.isIncome ?? false;
            return `${isIncome ? '+' : '-'}${formatCurrency(Math.abs(typeof transaction.amount === 'string' ? parseFloat(transaction.amount) : transaction.amount))}`;
          })()}
        </span>
      </div>
    </div>
  );
};

export default TransactionItem;
