import React, { useState } from 'react';
import { Bot, Send, Loader2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const AIChat: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // 将问题编码并作为查询参数传递
    const encodedQuestion = encodeURIComponent(input.trim());
    navigate(`/ai-chat?question=${encodedQuestion}`);
  };

  const handleOpenNewChat = () => {
    navigate('/ai-chat');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex items-center p-4 border-b border-gray-100">
        <Bot className="h-6 w-6 text-purple-500 mx-3" />
        <span className="text-lg font-medium text-gray-700">{t('aiChatTitle')}</span>
        <button
          onClick={handleOpenNewChat}
          className="ml-auto p-2 text-gray-500 hover:text-pink-500 transition-colors"
          title={t('openNewChat')}
        >
          <ExternalLink className="h-5 w-5" />
        </button>
      </div>

      {/* 对话示例内容 */}
      <div className="py-4 px-3 h-80 overflow-y-auto space-y-4 bg-gray-50">
        {/* AI Message */}
        <div className="flex items-start">
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Bot className="h-4 w-4 text-purple-500" />
          </div>
          <div className="ml-3 bg-gray-100 py-2 px-4 rounded-2xl rounded-tl-none max-w-xs">
            <p className="text-sm text-gray-700">{t('aiGreeting')}</p>
          </div>
        </div>
        {/* User Message */}
        <div className="flex items-start flex-row-reverse">
          <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-pink-500">{t('you')}</span>
          </div>
          <div className="mr-3 bg-pink-500 py-2 px-4 rounded-2xl rounded-tr-none max-w-xs">
            <p className="text-sm text-white">{t('userMessage')}</p>
          </div>
        </div>
        {/* AI Message */}
        <div className="flex items-start">
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Bot className="h-4 w-4 text-purple-500" />
          </div>
          <div className="ml-3 bg-gray-100 py-2 px-4 rounded-2xl rounded-tl-none max-w-xs">
            <p className="text-sm text-gray-700">{t('aiResponse')}</p>
          </div>
        </div>
        {/* Typing indicator */}
        <div className="flex items-start">
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Bot className="h-4 w-4 text-purple-500" />
          </div>
          <div className="ml-3 bg-gray-100 py-3 px-4 rounded-2xl rounded-tl-none">
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('typeMessage')}
            className="w-full rounded-full border border-gray-200 py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;