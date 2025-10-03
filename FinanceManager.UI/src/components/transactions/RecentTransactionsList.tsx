import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import type { Transaction } from '@/types/transaction';
import { transactionService, categoryService } from '@/services';
import TransactionItem from './TransactionItem';
import TransactionItemSkeleton from './TransactionItemSkeleton';
import TransactionListHeader from './TransactionListHeader';
import './RecentTransactionsList.css';

interface RecentTransactionsListProps {
  accountId: number;
  limit?: number;
  title?: string;
  showViewAllButton?: boolean;
  onTransactionClick?: (transaction: Transaction) => void;
  onViewAllClick?: () => void;
  className?: string;
}

export interface RecentTransactionsListRef {
  clearCache: () => void;
}

const RecentTransactionsList = forwardRef<RecentTransactionsListRef, RecentTransactionsListProps>(({
  accountId,
  limit = 5,
  title = 'Recent Transactions',
  showViewAllButton = true,
  onTransactionClick,
  onViewAllClick,
  className = ''
}, ref) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Cache for transactions by account ID
  const transactionsCache = useRef<Map<number, Transaction[]>>(new Map());

  useEffect(() => {
    if (accountId) {
      fetchTransactions();
    }
  }, [accountId, limit]);

  const fetchTransactions = async () => {
    if (!accountId) return;

    // Check cache first
    const cacheKey = accountId;
    const cachedTransactions = transactionsCache.current.get(cacheKey);
    
    if (cachedTransactions) {
      setTransactions(cachedTransactions);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch transactions and categories in parallel
      const [fetchedTransactions, categoriesResponse] = await Promise.all([
        transactionService.getRecentTransactions(accountId, limit),
        categoryService.getCategories(1, 100) // Fetch all categories
      ]);

      // Ensure we have an array of transactions
      const transactionsArray = Array.isArray(fetchedTransactions) ? fetchedTransactions : [];
      
      // Create a map of categories for quick lookup
      const categoryMap = new Map(categoriesResponse.categories.map(cat => [cat.id, cat]));
      
      // Populate transactions with category data
      const transactionsWithCategories = transactionsArray.map(transaction => ({
        ...transaction,
        category: categoryMap.get(parseInt(transaction.categoryId))
      }));
      
      // Cache the transactions
      transactionsCache.current.set(cacheKey, transactionsWithCategories);
      
      setTransactions(transactionsWithCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionClick = (transaction: Transaction) => {
    onTransactionClick?.(transaction);
  };

  const handleRetry = () => {
    fetchTransactions();
  };

  // Expose clearCache function to parent component
  useImperativeHandle(ref, () => ({
    clearCache: () => {
      transactionsCache.current.clear();
      
      // Also refresh current account's transactions
      if (accountId) {
        fetchTransactions();
      }
    }
  }));

  // Cache automatically expires after 5 minutes to ensure data freshness
  useEffect(() => {
    const cacheTimeout = setTimeout(() => {
      transactionsCache.current.clear();
      
      // Also refresh current account's transactions when cache expires
      if (accountId) {
        fetchTransactions();
      }
    }, 5 * 60 * 1000); // Clear cache after 5 minutes

    return () => clearTimeout(cacheTimeout);
  }, [accountId]); // Add accountId as dependency

  const renderContent = () => {
    if (loading) {
      return (
        <div className="recent-transactions-list__items">
          {Array.from({ length: limit }, (_, index) => (
            <TransactionItemSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="recent-transactions-list__error">
          <div className="recent-transactions-list__error-icon">⚠️</div>
          <div className="recent-transactions-list__error-content">
            <p className="recent-transactions-list__error-message">
              {error}
            </p>
            <button
              className="recent-transactions-list__retry-button"
              onClick={handleRetry}
              type="button"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (transactions.length === 0) {
      return (
        <div className="recent-transactions-list__empty">
          <div className="recent-transactions-list__empty-icon">📝</div>
          <div className="recent-transactions-list__empty-content">
            <h3 className="recent-transactions-list__empty-title">No Recent Transactions</h3>
            <p className="recent-transactions-list__empty-description">
              Transactions for this account will appear here
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="recent-transactions-list__items">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onClick={handleTransactionClick}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`recent-transactions-list ${className}`}>
      <TransactionListHeader
        title={title}
        showViewAllButton={showViewAllButton}
        onViewAllClick={onViewAllClick}
      />
      <div className="recent-transactions-list__content">
        {renderContent()}
      </div>
    </div>
  );
});

RecentTransactionsList.displayName = 'RecentTransactionsList';

export default RecentTransactionsList;