import React, { useState, useEffect } from 'react';
import { AccountCarousel } from '@/components/carousel';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { accountService } from '@/services/AccountService';
import type { Account } from '@/types/account';
import './Home.css';

const Home: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await accountService.getAccounts(1, 50); // Fetch up to 50 accounts
        setAccounts(response.accounts);
      } catch (err) {
        console.error('Failed to fetch accounts:', err);
        setError('Failed to load accounts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountClick = (account: Account) => {
    // Navigate to account details or transactions
    console.log('Account clicked:', account);
    // TODO: Implement navigation to account details page
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
              console.log('Navigate to create account');
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
          <h1 className="home-title">Your Accounts</h1>
          <p className="home-subtitle">
            {accounts.length} {accounts.length === 1 ? 'account' : 'accounts'} available
          </p>
        </div>
        
        <div className="home-carousel">
          <AccountCarousel
            accounts={accounts}
            onAccountClick={handleAccountClick}
            showControls={true}
            showDots={true}
          />
        </div>
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
