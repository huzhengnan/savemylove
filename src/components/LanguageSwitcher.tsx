import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-sm font-medium"
    >
      <span className="h-4 w-4 rounded-full overflow-hidden flex-shrink-0">
        {language === 'zh' ? (
          // Chinese flag indicator (simplified)
          <div className="bg-red-600 h-full w-full flex items-center justify-center">
            <span className="text-[8px] text-yellow-400">中</span>
          </div>
        ) : (
          // English flag indicator (simplified)
          <div className="bg-blue-900 h-full w-full flex items-center justify-center">
            <span className="text-[8px] text-white">EN</span>
          </div>
        )}
      </span>
      <span>{t('langSwitch')}</span>
    </button>
  );
};

export default LanguageSwitcher;