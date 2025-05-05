import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import openrouterService from '../service/openrouterService';
import StreamMarkdown from '../components/StreamMarkdown';
import { Loader2 } from 'lucide-react';

const BreakupRecovery: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    breakupReason: '',
    currentFeelings: '',
    contactStatus: '',
    mutualConnections: '',
    personalGrowth: '',
    reconciliationDesire: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await openrouterService.analyzeBreakupRecovery(
        formData.breakupReason,
        formData.currentFeelings,
        formData.contactStatus,
        formData.mutualConnections,
        formData.personalGrowth,
        formData.reconciliationDesire,
        (chunk: string) => setResult(prev => prev + chunk)
      );
    } catch (error) {
      console.error('Error analyzing breakup recovery:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">{t('breakupRecoveryAnalysis')}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('breakupReason')}
          </label>
          <textarea
            name="breakupReason"
            value={formData.breakupReason}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describeBreakupReason')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('currentFeelings')}
          </label>
          <textarea
            name="currentFeelings"
            value={formData.currentFeelings}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describeCurrentFeelings')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contactStatus')}
          </label>
          <textarea
            name="contactStatus"
            value={formData.contactStatus}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describeContactStatus')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('mutualConnections')}
          </label>
          <textarea
            name="mutualConnections"
            value={formData.mutualConnections}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describeMutualConnections')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('personalGrowth')}
          </label>
          <textarea
            name="personalGrowth"
            value={formData.personalGrowth}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describePersonalGrowth')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('reconciliationDesire')}
          </label>
          <textarea
            name="reconciliationDesire"
            value={formData.reconciliationDesire}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describeReconciliationDesire')}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              {t('analyzing')}
            </span>
          ) : (
            t('analyze')
          )}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{t('analysisResult')}</h2>
          <StreamMarkdown content={result} />
        </div>
      )}
    </div>
  );
};

export default BreakupRecovery;