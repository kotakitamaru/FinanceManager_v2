import './TransactionItemSkeleton.css';

interface TransactionItemSkeletonProps {
  className?: string;
}

const TransactionItemSkeleton: React.FC<TransactionItemSkeletonProps> = ({
  className = ''
}) => {
  return (
    <div className={`transaction-item-skeleton ${className}`}>
      {/* Category Icon Skeleton */}
      <div className="transaction-item-skeleton__icon">
        <div className="transaction-item-skeleton__icon-placeholder" />
      </div>

      {/* Transaction Details Skeleton */}
      <div className="transaction-item-skeleton__details">
        <div className="transaction-item-skeleton__description">
          <div className="transaction-item-skeleton__description-line" />
          <div className="transaction-item-skeleton__description-line-short" />
        </div>
        <div className="transaction-item-skeleton__meta">
          <div className="transaction-item-skeleton__date" />
          <div className="transaction-item-skeleton__category" />
        </div>
      </div>

      {/* Amount Skeleton */}
      <div className="transaction-item-skeleton__amount">
        <div className="transaction-item-skeleton__amount-value" />
      </div>
    </div>
  );
};

export default TransactionItemSkeleton;
