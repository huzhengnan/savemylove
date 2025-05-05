import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import openrouterService from '../service/openrouterService';
import StreamMarkdown from '../components/StreamMarkdown';
import { Loader2 } from 'lucide-react';

const EmotionalHealing: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    emotionalWounds: '',
    healingProgress: '',
    supportSystem: '',
    selfCare: '',
    futureGoals: '',
    copingStrategies: ''
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
      const response = await openrouterService.analyzeEmotionalHealing(
        formData.emotionalWounds,
        formData.healingProgress,
        formData.supportSystem,
        formData.selfCare,
        formData.futureGoals,
        formData.copingStrategies,
        (chunk: string) => setResult(prev => prev + chunk)
      );
    } catch (error) {
      console.error('Error analyzing emotional healing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">{t('emotionalHealingAnalysis')}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('emotionalWounds')}
          </label>
          <textarea
            name="emotionalWounds"
            value={formData.emotionalWounds}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describeEmotionalWounds')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('healingProgress')}
          </label>
          <textarea
            name="healingProgress"
            value={formData.healingProgress}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describeHealingProgress')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('supportSystem')}
          </label>
          <textarea
            name="supportSystem"
            value={formData.supportSystem}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describeSupportSystem')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('selfCare')}
          </label>
          <textarea
            name="selfCare"
            value={formData.selfCare}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describeSelfCare')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('futureGoals')}
          </label>
          <textarea
            name="futureGoals"
            value={formData.futureGoals}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describeFutureGoals')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('copingStrategies')}
          </label>
          <textarea
            name="copingStrategies"
            value={formData.copingStrategies}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            placeholder={t('describeCopingStrategies')}
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

export default EmotionalHealing;