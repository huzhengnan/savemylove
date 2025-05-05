import React from 'react';
import { PieChart, Lightbulb, ArrowLeftRight, HeartPulse } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

interface AreaCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconBgColor: string;
  to: string;
}

const AreaCard: React.FC<AreaCardProps> = ({ icon, title, description, bgColor, iconBgColor, to }) => {
  const { t } = useLanguage();
  
  return (
    <Link to={to} className="block">
    <div className={`relative group overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all ${bgColor} p-8`}>
      {/* Decorative pattern */}
      <div className="absolute -right-16 -top-16 w-32 h-32 bg-white opacity-5 rounded-full"></div>
      <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-white opacity-5 rounded-full"></div>
      
      <div className={`w-14 h-14 rounded-full ${iconBgColor} flex items-center justify-center text-white mb-6`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-white/90 mb-6">{description}</p>
      
      <button className="px-4 py-2 bg-white text-sm font-medium rounded-md shadow-sm hover:shadow transition-all group-hover:translate-y-0 transform translate-y-1">
        {t('learnMore')}
      </button>
    </div>
    </Link>
  );
};

const ConsultationAreas: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="areas" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('areasTitle')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('areasDesc')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AreaCard
          icon={<PieChart className="h-7 w-7" />}
          title={t('unrequited')}
          description={t('unrequitedDesc')}
          bgColor="bg-gradient-to-br from-pink-500 to-pink-600"
          iconBgColor="bg-pink-400"
          to="/unrequited-love"
        />
        
        <AreaCard
          icon={<Lightbulb className="h-7 w-7" />}
          title={t('insecure')}
          description={t('insecureDesc')}
          bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          iconBgColor="bg-purple-400"
          to="/relationship-anxiety"
        />
        
        <AreaCard
          icon={<ArrowLeftRight className="h-7 w-7" />}
          title={t('breakup')}
          description={t('breakupDesc')}
          bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          iconBgColor="bg-blue-400"
          to="/breakup-recovery"
        />
        
        <AreaCard
          icon={<HeartPulse className="h-7 w-7" />}
          title={t('repair')}
          description={t('repairDesc')}
          bgColor="bg-gradient-to-br from-teal-500 to-teal-600"
          iconBgColor="bg-teal-400"
          to="/emotional-healing"
        />
      </div>
    </section>
  );
};

export default ConsultationAreas;