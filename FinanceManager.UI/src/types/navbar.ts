import type { ReactNode } from 'react';

export interface NavButtonProps {
  icon: ReactNode;
  text: string;
  isActive: boolean;
  onClick: () => void;
  'aria-label'?: string;
}

// FooterNavbar doesn't need props - uses useLocation() internally

export type NavItem = {
  id: string;
  path: string;
  label: string;
  icon: ReactNode;
};
