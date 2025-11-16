import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'The Problem', id: 'problem' },
    { name: 'Solution', id: 'solution' },
    { name: 'Features', id: 'features' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-navy/95 backdrop-blur-lg shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button onClick={() => scrollToSection('home')} className="flex items-center">
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-violet-light hover:text-violet-pastel transition-colors duration-300">
              ClubSync
            </h1>
          </button>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-inter text-white/90 hover:text-violet-light transition-colors duration-300 text-sm lg:text-base font-medium"
              >
                {link.name}
              </button>
            ))}
            {user ? (
              <>
                <button onClick={() => navigate('/dashboard')} className="font-inter text-white/90 hover:text-violet-light transition-colors duration-300 text-sm lg:text-base font-medium">Dashboard</button>
                <button onClick={handleSignOut} className="bg-violet-soft hover:bg-violet-light text-white font-inter font-semibold px-4 py-2 rounded-full text-sm shadow-lg transition-all duration-300">
                  Sign Out
                </button>
              </>
            ) : (
              <button onClick={() => navigate('/signin')} className="bg-navy-light hover:bg-violet-soft text-white font-inter font-semibold px-4 py-2 rounded-full text-sm shadow-lg transition-all duration-300">
                Sign In
              </button>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-navy/98 backdrop-blur-lg border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left font-inter text-white/90 hover:text-violet-light hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300"
                >
                  {link.name}
                </button>
              ))}
               <div className="border-t border-white/10 pt-4 space-y-4">
                {user ? (
                  <>
                    <button onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-inter text-white/90 hover:text-violet-light hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300">Dashboard</button>
                    <button onClick={handleSignOut} className="block w-full text-left font-inter text-white/90 hover:text-violet-light hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300">Sign Out</button>
                  </>
                ) : (
                  <button onClick={() => { navigate('/signin'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-inter text-white/90 hover:text-violet-light hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300">Sign In</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
