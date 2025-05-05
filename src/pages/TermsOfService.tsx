import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const TermsOfService: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('termsOfService')}
        </h1>
        
        <div className="prose prose-pink max-w-none">
          <p className="text-gray-600 mb-6">
            {t('termsIntro')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('serviceDescription')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('serviceDescriptionDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('userObligations')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('userObligationsDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('intellectualProperty')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('intellectualPropertyDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('limitationOfLiability')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('limitationOfLiabilityDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('termination')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('terminationDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('governingLaw')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('governingLawDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('changesToTerms')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('changesToTermsDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('contactUs')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('termsContactDesc')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 