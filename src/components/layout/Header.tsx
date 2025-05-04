
import React from 'react';
import { Link } from 'react-router-dom';
import { WalletConnect } from '@/components/WalletConnect';

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="font-bold">Open Invest DAO</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/journeys" className="hover:text-primary">Journeys</Link>
            <Link to="/onboarding" className="hover:text-primary">Onboarding</Link>
          </nav>
        </div>
        <div className="flex gap-4 items-center">
          <WalletConnect />
        </div>
      </div>
    </header>
  );
}
