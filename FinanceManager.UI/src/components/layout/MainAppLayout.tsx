import React from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import { FooterNavbar } from './navbar';

interface MainAppLayoutProps {
  children: ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <main className="flex-1 lg:ml-64 pb-20">
          {children}
        </main>
      </div>
      <FooterNavbar />
    </div>
  );
};

export default MainAppLayout;
