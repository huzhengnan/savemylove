import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('privacyPolicy')}
        </h1>
        
        <div className="prose prose-pink max-w-none">
          <p className="text-gray-600 mb-6">
            {t('privacyPolicyIntro')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('informationCollection')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('informationCollectionDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('informationUsage')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('informationUsageDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('dataSecurity')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('dataSecurityDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('cookies')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('cookiesDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('thirdParty')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('thirdPartyDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('userRights')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('userRightsDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('policyUpdates')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('policyUpdatesDesc')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {t('contactUs')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('privacyContactDesc')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 