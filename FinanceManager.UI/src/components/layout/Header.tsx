import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="px-4 py-3 sm:px-6 sm:py-4">
        <h1 className="font-semibold text-lg sm:text-xl text-gray-900">
          Finance Manager
        </h1>
      </div>
    </header>
  );
};

export default Header;
