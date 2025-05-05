import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import openrouterService from '../service/openrouterService';
import StreamMarkdown from '../components/StreamMarkdown';
import { Loader2 } from 'lucide-react';

const ReconciliationAssessment: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    breakupReason: '',
    breakupTime: '',
    currentContact: '',
    mutualFriends: '',
    pastIssues: '',
    changesMade: ''
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
      const response = await openrouterService.assessReconciliation(
        formData.breakupReason,
        formData.breakupTime,
        formData.currentContact,
        formData.mutualFriends,
        formData.pastIssues,
        formData.changesMade,
        (chunk: string) => setResult(prev => prev + chunk)
      );
    } catch (error) {
      console.error('Error assessing reconciliation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">{t('reconciliationAssessment')}</h1>
      <p className="text-gray-600 text-center mb-8">{t('reconciliationAssessmentDesc')}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('breakupReason')}
          </label>
          <textarea
            name="breakupReason"
            value={formData.breakupReason}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('breakupReasonPlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('breakupTime')}
          </label>
          <input
            type="text"
            name="breakupTime"
            value={formData.breakupTime}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('breakupTimePlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('currentContact')}
          </label>
          <textarea
            name="currentContact"
            value={formData.currentContact}
            onChange={handleInputChange}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('currentContactPlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('mutualFriends')}
          </label>
          <textarea
            name="mutualFriends"
            value={formData.mutualFriends}
            onChange={handleInputChange}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('mutualFriendsPlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('pastIssues')}
          </label>
          <textarea
            name="pastIssues"
            value={formData.pastIssues}
            onChange={handleInputChange}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('pastIssuesPlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('changesMade')}
          </label>
          <textarea
            name="changesMade"
            value={formData.changesMade}
            onChange={handleInputChange}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('changesMadePlaceholder')}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {t('analyzing')}
            </div>
          ) : (
            t('assessReconciliation')
          )}
        </button>
      </form>

      {result && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('assessmentResult')}</h2>
          <StreamMarkdown content={result} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default ReconciliationAssessment; 