import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import NameCompatibility from './NameCompatibility';
import ZodiacMatch from './ZodiacMatch';
import PursuitStrategy from './PursuitStrategy';
import ChatAnalysis from './ChatAnalysis';
import ReconciliationAssessment from './ReconciliationAssessment';
import EmotionalHealth from './EmotionalHealth';
import { Helmet } from 'react-helmet-async';

const LoveCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('name');

  const tabs = [
    { id: 'name', label: t('nameCompatibility') },
    { id: 'zodiac', label: t('zodiacMatch') },
    { id: 'pursuit', label: t('pursuitStrategy') },
    { id: 'chat', label: t('chatAnalysis') },
    { id: 'reconciliation', label: t('reconciliationAssessment') },
    { id: 'health', label: t('emotionalHealth') },
  ];

  return (
    <>
      <Helmet>
        <title>{t('loveCalculatorTitle')}</title>
        <meta name="description" content={t('loveCalculatorDescription')} />
        <meta property="og:title" content={t('loveCalculatorTitle')} />
        <meta property="og:description" content={t('loveCalculatorDescription')} />
        <link rel="canonical" href="https://savemy.love/love-calculator" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            {t('loveCalculator')}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-pink-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            {activeTab === 'name' && <NameCompatibility />}
            {activeTab === 'zodiac' && <ZodiacMatch />}
            {activeTab === 'pursuit' && <PursuitStrategy />}
            {activeTab === 'chat' && <ChatAnalysis />}
            {activeTab === 'reconciliation' && <ReconciliationAssessment />}
            {activeTab === 'health' && <EmotionalHealth />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoveCalculator; 