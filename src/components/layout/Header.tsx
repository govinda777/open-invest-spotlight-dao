
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 bg-white/90 backdrop-blur-md fixed top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-dao-purple">
            OpenInvestDAO
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-700 hover:text-dao-purple transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-slate-700 hover:text-dao-purple transition-colors">
            How it Works
          </a>
          <a href="#community" className="text-slate-700 hover:text-dao-purple transition-colors">
            Community
          </a>
          <Button className="bg-dao-purple hover:bg-dao-darkPurple text-white">
            Join DAO
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-slate-800" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 right-0 bg-white border-t py-4 px-6 shadow-md">
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-slate-700 hover:text-dao-purple py-2"
              onClick={toggleMenu}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-slate-700 hover:text-dao-purple py-2"
              onClick={toggleMenu}
            >
              How it Works
            </a>
            <a 
              href="#community" 
              className="text-slate-700 hover:text-dao-purple py-2"
              onClick={toggleMenu}
            >
              Community
            </a>
            <Button className="bg-dao-purple hover:bg-dao-darkPurple text-white w-full">
              Join DAO
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
