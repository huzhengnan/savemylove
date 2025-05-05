import React, { useState, useRef } from 'react';
import { Bot, Send, Loader2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import openrouterService from '../service/openrouterService';
import StreamMarkdown from '../components/StreamMarkdown';
import { useNavigate, useLocation } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChatPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t('aiGreeting') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 处理 URL 中的问题参数，直接用新数组setMessages，避免闭包重复
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const question = searchParams.get('question');
    if (question) {
      const newMessages = [
        ...messages,
        { role: 'user' as const, content: question },
        { role: 'assistant' as const, content: '' }
      ];
      setMessages(newMessages);
      (async () => {
        await Promise.resolve(); // 等待setMessages生效
        await handleQuestion(question);
        navigate('/ai-chat', { replace: true });
      })();
    }
    // eslint-disable-next-line
  }, [location.search]);

  // 只处理AI回复，流式回调只更新最后一条assistant消息
  const handleQuestion = async (question: string) => {
    setIsLoading(true);
    try {
      let aiResponse = '';
      await openrouterService.provideCommunicationGuidance(
        question,
        (chunk: string) => {
          aiResponse += chunk;
          setMessages(prev => {
            const newMessages = [...prev];
            // 只更新最后一条assistant消息
            if (newMessages.length && newMessages[newMessages.length - 1].role === 'assistant') {
              newMessages[newMessages.length - 1].content = aiResponse;
            }
            return newMessages;
          });
        },
        language
      );
    } catch (error) {
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length && newMessages[newMessages.length - 1].role === 'assistant') {
          newMessages[newMessages.length - 1].content = t('errorOccurred');
        } else {
          newMessages.push({ role: 'assistant', content: t('errorOccurred') });
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 只在这里添加用户消息和一条空assistant消息，直接用新数组setMessages
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = '48px';
    const newMessages = [
      ...messages,
      { role: 'user' as const, content: userMessage },
      { role: 'assistant' as const, content: '' }
    ];
    setMessages(newMessages);
    await Promise.resolve(); // 等待setMessages生效
    await handleQuestion(userMessage);
  };

  // 自适应textarea高度
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '48px'; // reset
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-100 flex flex-col">
      <div className="flex-1 flex justify-center items-center py-2 px-1">
        <div className="w-full max-w-5xl h-[90vh] bg-white/95 rounded-3xl shadow-2xl border border-gray-100 flex flex-col relative">
          {/* 顶部栏 */}
          <div className="flex items-center px-10 py-6 border-b border-gray-100 bg-white/90 rounded-t-3xl sticky top-0 z-10">
            <button
              onClick={handleBack}
              className="p-2 text-gray-400 hover:text-pink-500 transition-colors"
              title={t('back')}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Bot className="h-7 w-7 text-purple-500 mx-4" />
            <span className="text-2xl font-semibold text-gray-700 tracking-wide">{t('aiChatTitle')}</span>
            <span className="ml-auto bg-green-50 text-green-600 text-sm px-4 py-1 rounded-full shadow-sm">
              {isLoading ? t('analyzing') : t('online')}
            </span>
          </div>

          {/* 聊天内容区 */}
          <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8 custom-scrollbar bg-gradient-to-b from-white/80 to-blue-50/40">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 flex items-end">
                    <Bot className="h-8 w-8 text-purple-400 bg-purple-100 rounded-full p-1 shadow mr-3" />
                  </div>
                )}
                <div
                  className={`max-w-3xl px-7 py-4 rounded-2xl shadow-md whitespace-pre-line break-words text-lg
                    ${message.role === 'user'
                      ? 'bg-pink-400 text-white rounded-br-3xl rounded-tl-3xl'
                      : 'bg-white text-gray-800 rounded-bl-3xl rounded-tr-3xl border border-purple-100'}
                  `}
                >
                  <StreamMarkdown 
                    content={message.content} 
                    loading={isLoading && index === messages.length - 1 && message.role === 'assistant'}
                  />
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 flex items-end">
                    <span className="ml-3 text-pink-400 font-bold text-base bg-pink-100 rounded-full px-4 py-1 shadow">{t('you')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 输入区 */}
          <form onSubmit={handleSubmit} className="absolute left-0 right-0 bottom-0 px-10 pb-8 pt-3 bg-gradient-to-t from-white/95 to-transparent rounded-b-3xl border-t border-gray-100">
            <div className="relative flex items-end gap-4">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                placeholder={t('typeMessage')}
                className="flex-1 rounded-2xl border border-gray-200 py-4 pl-6 pr-16 text-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white shadow-sm resize-none min-h-[56px] max-h-56 overflow-y-auto custom-scrollbar"
                disabled={isLoading}
                rows={1}
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 bottom-4 h-14 w-14 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-xl"
                style={{ zIndex: 2 }}
              >
                {isLoading ? (
                  <Loader2 className="h-7 w-7 animate-spin" />
                ) : (
                  <Send className="h-7 w-7" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* 自定义滚动条样式 */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e9d5ff;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default AIChatPage; 