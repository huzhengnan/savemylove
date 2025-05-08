import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';

const HowToUse: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      title: t('howToUse.step1.title'),
      description: t('howToUse.step1.description'),
      icon: '📝'
    },
    {
      title: t('howToUse.step2.title'),
      description: t('howToUse.step2.description'),
      icon: '🔍'
    },
    {
      title: t('howToUse.step3.title'),
      description: t('howToUse.step3.description'),
      icon: '💡'
    },
    {
      title: t('howToUse.step4.title'),
      description: t('howToUse.step4.description'),
      icon: '💝'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>{t('howToUse.title')} - SaveMyLove</title>
        <meta name="description" content={t('howToUse.description')} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('howToUse.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('howToUse.subtitle')}
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 text-4xl mr-4">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            {t('howToUse.readyToStart')}
          </p>
          <a
            href="/love-calculator"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-colors"
          >
            {t('howToUse.startButton')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowToUse; 