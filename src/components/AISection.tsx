import React from 'react';
import { Bot, MessageCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import AIChat from './AIChat';
import { useNavigate } from 'react-router-dom';

const AISection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <section id="ai" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('aiChatTitle')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('aiChatDesc')}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-center max-w-6xl mx-auto">
        {/* 左侧AIChat */}
        <div className="flex-1 min-w-[320px] max-w-xl mx-auto lg:mx-0">
          <AIChat />
        </div>
        {/* 右侧功能介绍 */}
        <div className="flex-1 min-w-[280px] max-w-xl space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('commSkills')}</h3>
          <p className="text-gray-600">
            {t('commDesc')}
          </p>
          <div className="space-y-4">
            <FeatureItem 
              icon={<MessageCircle className="h-5 w-5 text-pink-500" />}
              title={t('situational')}
              description={t('situationalDesc')}
            />
            <FeatureItem 
              icon={<Sparkles className="h-5 w-5 text-pink-500" />}
              title={t('realtime')}
              description={t('realtimeDesc')}
            />
            <FeatureItem 
              icon={<Bot className="h-5 w-5 text-pink-500" />}
              title={t('personalized')}
              description={t('personalizedDesc')}
            />
          </div>
          <button
            className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            onClick={() => navigate('/ai-chat')}
          >
            {t('startTraining')}
          </button>
        </div>
      </div>
    </section>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
        {icon}
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default AISection;