import React, { useState, useCallback } from 'react';
import TransactionList from '@/components/transactions/TransactionList';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import type { Transaction, TransactionFilters } from '@/types/transaction';
import './Transactions.css';

const Transactions: React.FC = () => {
  const [filters] = useState<Omit<TransactionFilters, 'sortBy' | 'sortOrder'>>({});
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Handle transaction click - could be used for modal or navigation
  const handleTransactionClick = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    // TODO: Implement transaction details modal or navigation
    console.log('Transaction clicked:', transaction);
  }, []);

  // Handle filter changes - could be used for future filter controls
  // const handleFiltersChange = useCallback((newFilters: Omit<TransactionFilters, 'sortBy' | 'sortOrder'>>) => {
  //   setFilters(newFilters);
  // }, []);

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('Transactions page error:', error, errorInfo);
        // TODO: Send error to error reporting service
      }}
    >
      <div className="transactions-page">
        <div className="transactions-page__container">
          {/* Page Header */}
          <div className="transactions-page__header">
            <h1 className="transactions-page__title">Transactions</h1>
            <p className="transactions-page__subtitle">
              View and manage all your financial transactions
            </p>
          </div>

          {/* Transaction List */}
          <div className="transactions-page__content">
            <TransactionList
              filters={filters}
              onTransactionClick={handleTransactionClick}
              title="All Transactions"
              showSortControls={true}
              itemsPerPage={20}
              className="transactions-page__transaction-list"
            />
          </div>

          {/* Future: Transaction Details Modal */}
          {selectedTransaction && (
            <div className="transactions-page__modal-overlay">
              <div className="transactions-page__modal">
                <h3>Transaction Details</h3>
                <p>Transaction ID: {selectedTransaction.id}</p>
                <p>Amount: {selectedTransaction.amount}</p>
                <p>Note: {selectedTransaction.note}</p>
                <p>Date: {selectedTransaction.date}</p>
                <button 
                  onClick={() => setSelectedTransaction(null)}
                  className="transactions-page__modal-close"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Transactions;
