import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 智能锚点跳转
  const handleAnchorNav = (anchor: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: anchor } });
    } else {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 w-full ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <Heart className="h-10 w-10 text-pink-500 group-hover:scale-110 transition-transform" fill="#F9A8D4" />
              <div className="absolute -inset-2 bg-pink-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-purple-600 transition-all">
              SaveMy.Love
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink onAnchor={() => handleAnchorNav('tools')}>{t('tools')}</NavLink>
            <NavLink onAnchor={() => handleAnchorNav('areas')}>{t('areas')}</NavLink>
            <NavLink to="/ai-chat" isRouter>{t('aiChat')}</NavLink>
            <LanguageSwitcher />
            <NavLink onAnchor={() => handleAnchorNav('contact')} isButton>{t('startConsultation')}</NavLink>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-xl border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink onAnchor={() => handleAnchorNav('tools')}>{t('tools')}</MobileNavLink>
            <MobileNavLink onAnchor={() => handleAnchorNav('areas')}>{t('areas')}</MobileNavLink>
            <MobileNavLink to="/ai-chat" isRouter>{t('aiChat')}</MobileNavLink>
            <MobileNavLink onAnchor={() => handleAnchorNav('contact')} isHighlighted>{t('startConsultation')}</MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href?: string;
  to?: string;
  children: React.ReactNode;
  isButton?: boolean;
  isRouter?: boolean;
  onAnchor?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, to, children, isButton, isRouter, onAnchor }) => {
  if (isButton && onAnchor) {
    return (
      <button
        onClick={onAnchor}
        className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-sm hover:shadow-md transition-all"
      >
        {children}
      </button>
    );
  }
  if (isRouter && to) {
    return (
      <Link
        to={to}
        className="text-gray-700 hover:text-pink-600 px-4 py-2 text-base font-medium transition-colors relative group"
      >
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
      </Link>
    );
  }
  if (onAnchor) {
    return (
      <button
        onClick={onAnchor}
        className="text-gray-700 hover:text-pink-600 px-4 py-2 text-base font-medium transition-colors relative group bg-transparent"
      >
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
      </button>
    );
  }
  return (
    <a
      href={href}
      className="text-gray-700 hover:text-pink-600 px-4 py-2 text-base font-medium transition-colors relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
    </a>
  );
};

interface MobileNavLinkProps {
  href?: string;
  to?: string;
  children: React.ReactNode;
  isHighlighted?: boolean;
  isRouter?: boolean;
  onAnchor?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, to, children, isHighlighted, isRouter, onAnchor }) => {
  if (isRouter && to) {
    return (
      <Link
        to={to}
        className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
          isHighlighted
            ? 'text-white bg-gradient-to-r from-pink-500 to-purple-500'
            : 'text-gray-700 hover:bg-gray-50 hover:text-pink-600'
        }`}
      >
        {children}
      </Link>
    );
  }
  if (onAnchor) {
    return (
      <button
        onClick={onAnchor}
        className={`block px-4 py-3 rounded-md text-base font-medium transition-colors w-full text-left ${
          isHighlighted
            ? 'text-white bg-gradient-to-r from-pink-500 to-purple-500'
            : 'text-gray-700 hover:bg-gray-50 hover:text-pink-600'
        }`}
      >
        {children}
      </button>
    );
  }
  return (
    <a
      href={href}
      className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
        isHighlighted
          ? 'text-white bg-gradient-to-r from-pink-500 to-purple-500'
          : 'text-gray-700 hover:bg-gray-50 hover:text-pink-600'
      }`}
    >
      {children}
    </a>
  );
};

export default Header;