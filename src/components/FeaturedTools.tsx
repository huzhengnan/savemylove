import React from 'react';
import { 
  HeartHandshake, 
  Scale, 
  Target, 
  MessageSquareText, 
  History, 
  Activity 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description }) => {
  const { t } = useLanguage();
  
  // 根据标题生成对应的路由路径
  const getRoutePath = (title: string) => {
    const routeMap: Record<string, string> = {
      '姓名缘分测算': '/name-compatibility',
      '星座匹配分析': '/zodiac-match',
      '个性化追求攻略': '/pursuit-strategy',
      '聊天记录分析': '/chat-analysis',
      '挽回可能性评估': '/reconciliation-assessment',
      '情感健康检测': '/emotional-health',
      // 英文路由映射
      'Name Compatibility': '/name-compatibility',
      'Zodiac Compatibility Analysis': '/zodiac-match',
      'Personalized Pursuit Strategy': '/pursuit-strategy',
      'Chat History Analysis': '/chat-analysis',
      'Reconciliation Possibility Assessment': '/reconciliation-assessment',
      'Emotional Health Detection': '/emotional-health'
    };
    
    return routeMap[title] || '/';
  };
  
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100 hover:border-pink-200">
      <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 mb-4 group-hover:bg-pink-500 group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <Link 
        to={getRoutePath(title)} 
        className="mt-4 text-sm font-medium text-pink-500 hover:text-pink-600 flex items-center"
      >
        {t('useNow')}
        <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

const FeaturedTools: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="tools" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('toolsTitle')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('toolsDesc')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard
          icon={<HeartHandshake className="h-6 w-6" />}
          title={t('nameCompat')}
          description={t('nameCompatDesc')}
        />
        
        <ToolCard
          icon={<Scale className="h-6 w-6" />}
          title={t('zodiac')}
          description={t('zodiacDesc')}
        />
        
        <ToolCard
          icon={<Target className="h-6 w-6" />}
          title={t('strategy')}
          description={t('strategyDesc')}
        />
        
        <ToolCard
          icon={<MessageSquareText className="h-6 w-6" />}
          title={t('chatAnalysis')}
          description={t('chatAnalysisDesc')}
        />
        
        <ToolCard
          icon={<History className="h-6 w-6" />}
          title={t('reconcileEval')}
          description={t('reconcileEvalDesc')}
        />
        
        <ToolCard
          icon={<Activity className="h-6 w-6" />}
          title={t('emotionalHealth')}
          description={t('emotionalHealthDesc')}
        />
      </div>
    </section>
  );
};

export default FeaturedTools;