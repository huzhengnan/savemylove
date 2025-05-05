import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import openrouterService from '../service/openrouterService';
import StreamMarkdown from '../components/StreamMarkdown';
import { Loader2 } from 'lucide-react';

const ZodiacMatch: React.FC = () => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    zodiac1: '',
    zodiac2: ''
  });

  const zodiacSigns = [
    { zh: '白羊座', en: 'Aries' },
    { zh: '金牛座', en: 'Taurus' },
    { zh: '双子座', en: 'Gemini' },
    { zh: '巨蟹座', en: 'Cancer' },
    { zh: '狮子座', en: 'Leo' },
    { zh: '处女座', en: 'Virgo' },
    { zh: '天秤座', en: 'Libra' },
    { zh: '天蝎座', en: 'Scorpio' },
    { zh: '射手座', en: 'Sagittarius' },
    { zh: '摩羯座', en: 'Capricorn' },
    { zh: '水瓶座', en: 'Aquarius' },
    { zh: '双鱼座', en: 'Pisces' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await openrouterService.analyzeZodiacMatch(
        formData.zodiac1,
        formData.zodiac2,
        (chunk: string) => setResult(prev => prev + chunk)
      );
    } catch (error) {
      console.error('Error analyzing zodiac match:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">{t('zodiacMatch')}</h1>
      <p className="text-gray-600 text-center mb-8">{t('zodiacMatchDescription')}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('yourZodiac')}
          </label>
          <select
            name="zodiac1"
            value={formData.zodiac1}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          >
            <option value="">{t('selectZodiac')}</option>
            {zodiacSigns.map((sign, index) => (
              <option key={index} value={sign[language]}>
                {sign[language]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('partnerZodiac')}
          </label>
          <select
            name="zodiac2"
            value={formData.zodiac2}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          >
            <option value="">{t('selectZodiac')}</option>
            {zodiacSigns.map((sign, index) => (
              <option key={index} value={sign[language]}>
                {sign[language]}
              </option>
            ))}
          </select>
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
            t('analyze')
          )}
        </button>
      </form>

      {result && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('analysisResult')}</h2>
          <StreamMarkdown content={result} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default ZodiacMatch; 