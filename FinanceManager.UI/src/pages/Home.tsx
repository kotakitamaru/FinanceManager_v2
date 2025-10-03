import React, { useState, useEffect, useRef } from 'react';
import { AccountCarousel } from '@/components/carousel';
import { RecentTransactionsList, type RecentTransactionsListRef } from '@/components/transactions';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { accountService } from '@/services/AccountService';
import type { Account } from '@/types/account';
import type { Transaction } from '@/types/transaction';
import './Home.css';

const Home: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const transactionsListRef = useRef<RecentTransactionsListRef>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await accountService.getAccounts(1, 50); // Fetch up to 50 accounts
        setAccounts(response.accounts);
      } catch {
        setError('Failed to load accounts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountClick = (_account: Account) => {
    // Navigate to account details or transactions
    // TODO: Implement navigation to account details page
  };

  const handleAccountSelectionChange = (account: Account) => {
    setSelectedAccount(account);
  };

  const handleTransactionClick = (_transaction: Transaction) => {
    // TODO: Implement navigation to transaction details
  };

  const handleViewAllTransactions = () => {
    // TODO: Implement navigation to transactions page
  };


  const renderContent = () => {
    if (loading) {
      return (
        <div className="home-loading">
          <LoadingSpinner />
          <p className="home-loading__text">Loading your accounts...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="home-error">
          <div className="home-error__icon">⚠️</div>
          <h2 className="home-error__title">Oops! Something went wrong</h2>
          <p className="home-error__message">{error}</p>
          <button 
            className="home-error__retry"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      );
    }

    if (accounts.length === 0) {
      return (
        <div className="home-empty">
          <div className="home-empty__icon">🏦</div>
          <h2 className="home-empty__title">No accounts yet</h2>
          <p className="home-empty__message">
            Create your first account to start tracking your finances!
          </p>
          <button 
            className="home-empty__cta"
            onClick={() => {
              // TODO: Navigate to create account page
            }}
          >
            Create Account
          </button>
        </div>
      );
    }

    return (
      <div className="home-content">
        <div className="home-header">
          <div className="home-header__content">
            <div className="home-header__text">
              <h1 className="home-title">Your Accounts</h1>
              <p className="home-subtitle">
                {accounts.length} {accounts.length === 1 ? 'account' : 'accounts'} available
              </p>
            </div>
          </div>
        </div>
        
        <div className="home-carousel">
          <AccountCarousel
            accounts={accounts}
            onAccountClick={handleAccountClick}
            onAccountSelectionChange={handleAccountSelectionChange}
            showControls={true}
            showDots={true}
          />
        </div>

        {selectedAccount && (
          <div className="home-transactions">
            <RecentTransactionsList
              ref={transactionsListRef}
              accountId={selectedAccount.id}
              limit={5}
              title={`Recent Transactions - ${selectedAccount.title}`}
              onTransactionClick={handleTransactionClick}
              onViewAllClick={handleViewAllTransactions}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="home-page">
      {renderContent()}
    </div>
  );
};

export default Home;
