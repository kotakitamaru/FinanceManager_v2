import React, { useState, useEffect, useCallback } from 'react';
import type { Transaction, TransactionFilters, SortField, SortOrder } from '@/types/transaction';
import { transactionService, categoryService } from '@/services';
import { getDefaultSorting } from '@/utils/transactionSorting';
import TransactionItem from './TransactionItem';
import TransactionItemSkeleton from './TransactionItemSkeleton';
import TransactionSortControls from '@/components/transactions/TransactionSortControls';
import './TransactionList.css';

interface TransactionListProps {
  filters?: Omit<TransactionFilters, 'sortBy' | 'sortOrder'>;
  onTransactionClick?: (transaction: Transaction) => void;
  className?: string;
  title?: string;
  showSortControls?: boolean;
  itemsPerPage?: number;
}

interface TransactionListState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalTransactions: number;
  sortBy: SortField;
  sortOrder: SortOrder;
}

const TransactionList: React.FC<TransactionListProps> = ({
  filters = {},
  onTransactionClick,
  className = '',
  title = 'All Transactions',
  showSortControls = true,
  itemsPerPage = 20
}) => {
  const [state, setState] = useState<TransactionListState>({
    transactions: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    totalTransactions: 0,
    ...getDefaultSorting()
  });

  // Fetch transactions with current filters and sorting
  const fetchTransactions = useCallback(async (page: number = state.currentPage) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await transactionService.getTransactions({
        ...filters,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
        page,
        limit: itemsPerPage
      });

      console.log('TransactionList: Received response:', response);

      // Fetch categories to populate transaction category data
      const categoriesResponse = await categoryService.getCategories(1, 100);
      const categoryMap = new Map(categoriesResponse.categories.map(cat => [cat.id, cat]));

      // Populate transactions with category data
      const transactionsWithCategories = (response.data || []).map(transaction => ({
        ...transaction,
        category: categoryMap.get(parseInt(transaction.categoryId))
      }));

      setState(prev => ({
        ...prev,
        transactions: transactionsWithCategories,
        currentPage: page,
        totalPages: Math.ceil((response.total || 0) / itemsPerPage),
        totalTransactions: response.total || 0,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load transactions',
        loading: false
      }));
    }
  }, [filters, state.sortBy, state.sortOrder, itemsPerPage]);

  // Initial load and when dependencies change
  useEffect(() => {
    fetchTransactions(1);
  }, [fetchTransactions]);

  // Handle sorting changes
  const handleSortChange = useCallback((sortBy: SortField, sortOrder: SortOrder) => {
    setState(prev => ({ ...prev, sortBy, sortOrder }));
  }, []);

  // Handle page changes
  const handlePageChange = useCallback((page: number) => {
    fetchTransactions(page);
  }, [fetchTransactions]);

  // Handle transaction click
  const handleTransactionClick = useCallback((transaction: Transaction) => {
    onTransactionClick?.(transaction);
  }, [onTransactionClick]);

  // Handle retry on error
  const handleRetry = useCallback(() => {
    fetchTransactions(state.currentPage);
  }, [fetchTransactions, state.currentPage]);

  // Render loading state
  const renderLoadingState = () => (
    <div className="transaction-list__items">
      {Array.from({ length: itemsPerPage }, (_, index) => (
        <TransactionItemSkeleton key={index} />
      ))}
    </div>
  );

  // Render error state
  const renderErrorState = () => (
    <div className="transaction-list__error">
      <div className="transaction-list__error-icon">⚠️</div>
      <div className="transaction-list__error-content">
        <h3 className="transaction-list__error-title">Failed to Load Transactions</h3>
        <p className="transaction-list__error-message">{state.error}</p>
        <button
          className="transaction-list__retry-button"
          onClick={handleRetry}
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  // Render empty state
  const renderEmptyState = () => (
    <div className="transaction-list__empty">
      <div className="transaction-list__empty-icon">📝</div>
      <div className="transaction-list__empty-content">
        <h3 className="transaction-list__empty-title">No Transactions Found</h3>
        <p className="transaction-list__empty-description">
          No transactions match your current filters
        </p>
      </div>
    </div>
  );

  // Render pagination controls
  const renderPagination = () => {
    if (state.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(state.totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`transaction-list__page-button ${
            i === state.currentPage ? 'transaction-list__page-button--active' : ''
          }`}
          onClick={() => handlePageChange(i)}
          type="button"
          disabled={state.loading}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="transaction-list__pagination">
        <button
          className="transaction-list__page-button transaction-list__page-button--nav"
          onClick={() => handlePageChange(state.currentPage - 1)}
          disabled={state.currentPage === 1 || state.loading}
          type="button"
        >
          Previous
        </button>
        {pages}
        <button
          className="transaction-list__page-button transaction-list__page-button--nav"
          onClick={() => handlePageChange(state.currentPage + 1)}
          disabled={state.currentPage === state.totalPages || state.loading}
          type="button"
        >
          Next
        </button>
      </div>
    );
  };

  // Render main content
  const renderContent = () => {
    if (state.loading) return renderLoadingState();
    if (state.error) return renderErrorState();
    if (state.transactions.length === 0) return renderEmptyState();

    return (
      <div className="transaction-list__items">
        {state.transactions.map((transaction) => (
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
    <div className={`transaction-list ${className}`}>
      {/* Header */}
      <div className="transaction-list__header">
        <h2 className="transaction-list__title">{title}</h2>
        {state.totalTransactions > 0 && (
          <span className="transaction-list__count">
            {state.totalTransactions} transaction{state.totalTransactions !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Sort Controls */}
      {showSortControls && (
        <TransactionSortControls
          sortBy={state.sortBy}
          sortOrder={state.sortOrder}
          onSortChange={handleSortChange}
          loading={state.loading}
        />
      )}

      {/* Content */}
      <div className="transaction-list__content">
        {renderContent()}
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default TransactionList;
