
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "./ui/button";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-white/80 backdrop-blur-md shadow-md" : "py-4 bg-transparent"
      }`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img src="/banner.svg" alt="Logo" className="h-9" />
            </Link>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent">Open Invest DAO</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer"
            >
              Features
            </button>
            <Link to="/journeys" className="text-foreground/80 hover:text-primary transition-colors">
              Journeys
            </Link>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('join')}
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer"
            >
              DAO
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:flex" asChild>
              <Link to="/onboarding">Sign In</Link>
            </Button>
            <Button variant="gradient" className="hidden sm:flex animate-scale-in" asChild>
              <Link to="/onboarding">Get Started</Link>
            </Button>
            <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 animate-fade-in md:hidden">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-lg font-medium px-4 py-2 hover:bg-slate-100 rounded-md w-full text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="block text-lg font-medium px-4 py-2 hover:bg-slate-100 rounded-md w-full text-left"
              >
                Features
              </button>
              <Link 
                to="/journeys" 
                className="block text-lg font-medium px-4 py-2 hover:bg-slate-100 rounded-md"
                onClick={toggleMenu}
              >
                Journeys
              </Link>
              <button 
                onClick={() => scrollToSection('projects')}
                className="block text-lg font-medium px-4 py-2 hover:bg-slate-100 rounded-md w-full text-left"
              >
                Projects
              </button>
              <Link 
                to="/onboarding" 
                className="block text-lg font-medium px-4 py-2 hover:bg-slate-100 rounded-md"
                onClick={toggleMenu}
              >
                Onboarding
              </Link>
              <div className="pt-4 mt-6 border-t">
                <Button className="w-full mb-4" onClick={toggleMenu} asChild>
                  <Link to="/onboarding">Get Started</Link>
                </Button>
                <Button variant="outline" className="w-full" onClick={toggleMenu} asChild>
                  <Link to="/onboarding">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4" 
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Button>
        </div>
      )}
    </>
  );
};
