
import { useState, useEffect } from 'react';
import { Button } from "./ui/button";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "py-2 bg-white/80 backdrop-blur-md shadow-md" : "py-4 bg-transparent"
    }`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/banner.svg" alt="Logo" className="h-9" />
          <h1 className="text-xl font-bold text-gradient">Open Invest DAO</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
            About
          </a>
          <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">
            Features
          </a>
          <a href="#investors" className="text-foreground/80 hover:text-primary transition-colors">
            Investors
          </a>
          <a href="#projects" className="text-foreground/80 hover:text-primary transition-colors">
            Projects
          </a>
          <a href="#dao" className="text-foreground/80 hover:text-primary transition-colors">
            DAO
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex">
            Sign In
          </Button>
          <Button variant="gradient" className="hidden sm:flex animate-scale-in">
            Get Started
          </Button>
          <Button variant="ghost" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};
