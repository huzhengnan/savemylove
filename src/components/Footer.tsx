import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Link, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAnchorClick = (anchor: string) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: anchor } });
    } else {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <footer id="contact" className="pt-16 pb-8 border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="flex items-center mb-4">
            <Heart className="h-8 w-8 text-pink-500" fill="#F9A8D4" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              SaveMy.Love
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            {t('consultationServices')}
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <LanguageSwitcher />
          </div>
          {/* <div className="flex space-x-4">
            <SocialLink icon={<Twitter className="h-5 w-5" />} href="#" />
          </div> */}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('loveCal')}</h3>
          <ul className="space-y-2">
            <FooterLink to="/name-compatibility">{t('nameComp')}</FooterLink>
            <FooterLink to="/zodiac-match">{t('zodiacMatch')}</FooterLink>
            <FooterLink to="/love-calculator">{t('affIndex')}</FooterLink>
            <FooterLink to="/pursuit-strategy">{t('pursuitStrat')}</FooterLink>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('emotConsult')}</h3>
          <ul className="space-y-2">
            <FooterLink to="/unrequited-love">{t('unrequitedLove')}</FooterLink>
            <FooterLink to="/relationship-anxiety">{t('insecurity')}</FooterLink>
            <FooterLink to="/reconciliation-assessment">{t('reconciliation')}</FooterLink>
            <FooterLink to="/emotional-healing">{t('emotRepair')}</FooterLink>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('contactUs')}</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Mail className="h-5 w-5 text-pink-500 mr-3" />
              <span className="text-gray-600">contact@savemy.love</span>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 text-pink-500 mr-3" />
              <span className="text-gray-600">+86 13148474898</span>
            </li>
            <li className="flex items-start">
              <MapPin className="h-5 w-5 text-pink-500 mr-3 mt-1" />
              <span className="text-gray-600">上海市浦东新区张江高科技园区</span>
            </li>
            <li>
              <FooterLink to="/how-to-use">{t('howToUse.title')}</FooterLink>
            </li>
            <li>
              <FooterLink to="/faq">{t('faq.title')}</FooterLink>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Newsletter */}
      {/* <div className="py-8 border-t border-b border-gray-100 mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">{t('newsletter')}</h3>
          <p className="text-gray-600 mb-6">
            {t('newsletterDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-lg shadow-sm transition-all whitespace-nowrap">
              {t('subscribe')}
            </button>
          </div>
        </div>
      </div> */}
      
      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm">
        <p className="mb-2">{t('copyright')}</p>
        <div className="flex justify-center space-x-4">
          <Link to="/privacy" className="hover:text-pink-500 transition-colors">{t('privacy')}</Link>
          <Link to="/terms" className="hover:text-pink-500 transition-colors">{t('terms')}</Link>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => {
  return (
    <a 
      href={href}
      className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-500 transition-colors"
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <Link 
        to={to}
        className="text-gray-600 hover:text-pink-500 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;