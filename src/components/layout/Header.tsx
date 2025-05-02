import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '@/assets/svg/logo.svg';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Open Invest Spotlight DAO" className="h-8 w-8" />
            <span className="text-xl font-bold text-slate-900">Open Invest</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-slate-600 hover:text-dao-purple transition-colors">
              About
            </Link>
            <Link to="/investments" className="text-slate-600 hover:text-dao-purple transition-colors">
              Investments
            </Link>
            <Link to="/governance" className="text-slate-600 hover:text-dao-purple transition-colors">
              Governance
            </Link>
            <Link to="/resources" className="text-slate-600 hover:text-dao-purple transition-colors">
              Resources
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-dao-purple text-dao-purple">
              Connect Wallet
            </Button>
            <Button className="bg-dao-purple hover:bg-dao-darkPurple">
              Join DAO
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
