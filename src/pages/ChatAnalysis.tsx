import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import openrouterService from '../service/openrouterService';
import StreamMarkdown from '../components/StreamMarkdown';
import { Loader2, Upload } from 'lucide-react';

const ChatAnalysis: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [chatContent, setChatContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // 读取文件内容
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setChatContent(event.target.result as string);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatContent) return;
    
    setLoading(true);
    setResult('');

    try {
      const response = await openrouterService.analyzeChatHistory(
        chatContent,
        (chunk: string) => setResult(prev => prev + chunk)
      );
    } catch (error) {
      console.error('Error analyzing chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">{t('chatAnalysis')}</h1>
      <p className="text-gray-600 text-center mb-8">{t('chatAnalysisDesc')}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            id="chatFile"
            accept=".txt,.json"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="chatFile"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">{t('uploadChatFile')}</p>
            <p className="text-sm text-gray-500">{t('supportedFormats')}</p>
          </label>
          {file && (
            <p className="mt-4 text-sm text-gray-600">
              {t('selectedFile')}: {file.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('chatContent')}
          </label>
          <textarea
            value={chatContent}
            onChange={(e) => setChatContent(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={t('chatContentPlaceholder')}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !chatContent}
          className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {t('analyzing')}
            </div>
          ) : (
            t('analyzeChat')
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

export default ChatAnalysis; 