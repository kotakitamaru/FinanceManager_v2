import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
      <div className="flex items-center justify-between h-16 px-6 bg-gray-900">
        <h2 className="text-lg font-semibold text-white">Menu</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white lg:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          <a href="/" className="block px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
            Dashboard
          </a>
          <a href="/transactions" className="block px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
            Transactions
          </a>
          <a href="/accounts" className="block px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
            Accounts
          </a>
          <a href="/categories" className="block px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
            Categories
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
