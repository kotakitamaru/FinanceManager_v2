import React from 'react';
import type { ReactNode } from 'react';
import { ROUTES } from '@/constants';
import Home from '@pages/Home';
import Accounts from '@pages/Accounts';
import Transactions from '@pages/Transactions';
import Stats from '@pages/Stats';

export interface RouteConfig {
  path: string;
  element: ReactNode;
  isProtected: boolean;
  redirectTo?: string;
}

export const protectedRoutes: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    element: React.createElement(Home),
    isProtected: true,
  },
  {
    path: ROUTES.TRANSACTIONS,
    element: React.createElement(Transactions),
    isProtected: true,
  },
  {
    path: ROUTES.ACCOUNTS,
    element: React.createElement(Accounts),
    isProtected: true,
  },
  {
    path: ROUTES.STATS,
    element: React.createElement(Stats),
    isProtected: true,
  },
  {
    path: ROUTES.CATEGORIES,
    element: React.createElement(Home), // Placeholder until Categories page is created
    isProtected: true,
  },
];
