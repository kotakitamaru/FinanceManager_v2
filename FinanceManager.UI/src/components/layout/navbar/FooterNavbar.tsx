import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { NavItem } from '@/types';
import { ROUTES } from '@/constants';
import NavButton from './NavButton';
import './FooterNavbar.css';

const FooterNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      id: 'home',
      path: ROUTES.HOME,
      label: 'Home',
      icon: '🏠'
    },
    {
      id: 'accounts',
      path: ROUTES.ACCOUNTS,
      label: 'Accounts',
      icon: '💳'
    },
    {
      id: 'transactions',
      path: ROUTES.TRANSACTIONS,
      label: 'Transactions',
      icon: '📊'
    },
    {
      id: 'stats',
      path: ROUTES.STATS,
      label: 'Stats',
      icon: '📈'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="footer-navbar">
      <div className="footer-navbar__container">
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            icon={item.icon}
            text={item.label}
            isActive={isActive(item.path)}
            onClick={() => handleNavigation(item.path)}
            aria-label={`Navigate to ${item.label}`}
          />
        ))}
      </div>
    </nav>
  );
};

export default FooterNavbar;
