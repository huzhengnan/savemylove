import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import openrouterService from '../service/openrouterService';
import StreamMarkdown from '../components/StreamMarkdown';
import { Loader2 } from 'lucide-react';

const EmotionalHealth: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    relationshipPatterns: '',
    emotionalTriggers: '',
    attachmentStyle: '',
    selfEsteem: '',
    communicationStyle: '',
    copingMechanisms: ''
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
      const response = await openrouterService.assessEmotionalHealth(
        formData.relationshipPatterns,
        formData.emotionalTriggers,
        formData.attachmentStyle,
        formData.selfEsteem,
        formData.communicationStyle,
        formData.copingMechanisms,
        (chunk: string) => setResult(prev => prev + chunk)
      );
    } catch (error) {
      console.error('Error assessing emotional health:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">{t('emotionalHealth')}</h1>
      <p className="text-gray-600 text-center mb-8">{t('emotionalHealthDesc')}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('relationshipPatterns')}
          </label>
          <textarea
            name="relationshipPatterns"
            value={formData.relationshipPatterns}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('relationshipPatternsPlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('emotionalTriggers')}
          </label>
          <textarea
            name="emotionalTriggers"
            value={formData.emotionalTriggers}
            onChange={handleInputChange}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('emotionalTriggersPlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('attachmentStyle')}
          </label>
          <textarea
            name="attachmentStyle"
            value={formData.attachmentStyle}
            onChange={handleInputChange}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('attachmentStylePlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('selfEsteem')}
          </label>
          <textarea
            name="selfEsteem"
            value={formData.selfEsteem}
            onChange={handleInputChange}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('selfEsteemPlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('communicationStyle')}
          </label>
          <textarea
            name="communicationStyle"
            value={formData.communicationStyle}
            onChange={handleInputChange}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('communicationStylePlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('copingMechanisms')}
          </label>
          <textarea
            name="copingMechanisms"
            value={formData.copingMechanisms}
            onChange={handleInputChange}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('copingMechanismsPlaceholder')}
            required
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
            t('assessEmotionalHealth')
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

export default EmotionalHealth; 