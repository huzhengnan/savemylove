import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import openrouterService from '../service/openrouterService';
import StreamMarkdown from '../components/StreamMarkdown';

const NameCompatibility: React.FC = () => {
  const { t, language } = useLanguage();
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUserScroll, setIsUserScroll] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) return;

    console.log('Starting name compatibility analysis:', { name1, name2 });
    setResult('');
    setLoading(true);
    setIsUserScroll(false);

    try {
      await openrouterService.analyzeNameCompatibility(
        name1,
        name2,
        language === 'zh' ? '中文' : 'English',
        handleStream
      );
    } catch (error) {
      console.error('Error analyzing names:', error);
      setResult(t('errorOccurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleResultScroll = () => {
    const el = resultRef.current;
    if (!el) return;

    const isAtBottom = Math.abs(
      (el.scrollHeight - el.scrollTop) - el.clientHeight
    ) < 10;

    console.log('Result scroll event:', {
      scrollTop: el.scrollTop,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      isAtBottom
    });

    setIsUserScroll(!isAtBottom);
  };

  const handleStream = (chunk: string) => {
    console.log('Received stream chunk:', { chunkLength: chunk.length });
    setResult(prev => prev + chunk);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {t('nameCompatibility')}
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('nameCompatibilityDescription')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name1" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('yourName')}
                </label>
                <input
                  type="text"
                  id="name1"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                  placeholder={t('enterYourName')}
                  required
                />
              </div>
              <div>
                <label htmlFor="name2" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('partnerName')}
                </label>
                <input
                  type="text"
                  id="name2"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                  placeholder={t('enterPartnerName')}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
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
      </div>
    </div>
  );
};

export default NameCompatibility;