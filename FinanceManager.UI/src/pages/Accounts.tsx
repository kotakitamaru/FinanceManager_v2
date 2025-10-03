import React, { useState, useEffect } from 'react';
import { AccountList } from '@components/accounts';
import { accountService } from '@/services';
import type { Account } from '@/types/account';
import './Accounts.css';

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await accountService.getAccounts();
        setAccounts(response.accounts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load accounts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountClick = (account: Account) => {
    // Placeholder for account click functionality
    console.log('Account clicked:', account);
    // TODO: Navigate to account details or perform account-specific action
  };

  return (
    <div className="accounts-page">
      <div className="accounts-page__header">
        <h1 className="accounts-page__title">Accounts</h1>
        <p className="accounts-page__subtitle">
          Manage your financial accounts and track balances
        </p>
      </div>
      
      <div className="accounts-page__content">
        <AccountList
          accounts={accounts}
          onAccountClick={handleAccountClick}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Accounts;
