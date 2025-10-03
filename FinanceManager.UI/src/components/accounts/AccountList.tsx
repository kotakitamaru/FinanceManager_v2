import React from 'react';
import type { Account } from '@/types/account';
import AccountCard from './AccountCard';
import './AccountList.css';

interface AccountListProps {
  accounts: Account[];
  onAccountClick?: (account: Account) => void;
  isLoading?: boolean;
  error?: string | null;
}

const AccountList: React.FC<AccountListProps> = ({ 
  accounts, 
  onAccountClick, 
  isLoading = false, 
  error = null 
}) => {
  if (isLoading) {
    return (
      <div className="account-list">
        <div className="account-list__loading">
          <div className="account-list__spinner"></div>
          <p>Loading accounts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="account-list">
        <div className="account-list__error">
          <p>Error loading accounts: {error}</p>
        </div>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="account-list">
        <div className="account-list__empty">
          <p>No accounts found. Create your first account to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-list">
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onClick={onAccountClick}
        />
      ))}
    </div>
  );
};

export default AccountList;
