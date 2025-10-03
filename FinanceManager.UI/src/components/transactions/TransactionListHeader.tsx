import './TransactionListHeader.css';

interface TransactionListHeaderProps {
  title?: string;
  onViewAllClick?: () => void;
  showViewAllButton?: boolean;
  className?: string;
}

const TransactionListHeader: React.FC<TransactionListHeaderProps> = ({
  title = 'Recent Transactions',
  onViewAllClick,
  showViewAllButton = true,
  className = ''
}) => {
  const handleViewAllClick = () => {
    onViewAllClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleViewAllClick();
    }
  };

  return (
    <div className={`transaction-list-header ${className}`}>
      <h3 className="transaction-list-header__title">
        {title}
      </h3>
      
      {showViewAllButton && (
        <button
          className="transaction-list-header__view-all-button"
          onClick={handleViewAllClick}
          onKeyDown={handleKeyDown}
          type="button"
          aria-label="View all transactions"
        >
          View All
        </button>
      )}
    </div>
  );
};

export default TransactionListHeader;
