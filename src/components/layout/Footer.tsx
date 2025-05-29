
import React from 'react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold text-dao-lightPurple mb-4">OpenInvestDAO</h2>
          <p className="text-slate-300 mb-6 max-w-md">
            A decentralized community of investors pooling resources, sharing knowledge, 
            and making collective investment decisions.
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com/govinda777/open_invest_dao" className="text-white hover:text-dao-lightPurple" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="#" className="text-white hover:text-dao-lightPurple">
              Twitter
            </a>
            <a href="#" className="text-white hover:text-dao-lightPurple">
              Discord
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#features" className="text-slate-300 hover:text-white">Features</a></li>
            <li><a href="#how-it-works" className="text-slate-300 hover:text-white">How it Works</a></li>
            <li><a href="#community" className="text-slate-300 hover:text-white">Community</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
          <p className="text-slate-300 mb-4">Subscribe to our newsletter</p>
          <div className="flex flex-col space-y-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white"
            />
            <Button className="bg-dao-purple hover:bg-dao-darkPurple w-full">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-slate-400 text-sm text-center">
        <p>© 2025 OpenInvestDAO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
