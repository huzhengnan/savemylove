import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedTools from './components/FeaturedTools';
import ConsultationAreas from './components/ConsultationAreas';
import AISection from './components/AISection';
import Footer from './components/Footer';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import LoveCalculator from './pages/LoveCalculator';
import NameCompatibility from './pages/NameCompatibility';
import ZodiacMatch from './pages/ZodiacMatch';
import PursuitStrategy from './pages/PursuitStrategy';
import ChatAnalysis from './pages/ChatAnalysis';
import ReconciliationAssessment from './pages/ReconciliationAssessment';
import EmotionalHealth from './pages/EmotionalHealth';
import UnrequitedLove from './pages/UnrequitedLove';
import RelationshipAnxiety from './pages/RelationshipAnxiety';
import BreakupRecovery from './pages/BreakupRecovery';
import EmotionalHealing from './pages/EmotionalHealing';
import AIChatPage from './pages/AIChatPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// 包装组件以使用hooks
const AppContent: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    // 检查是否有需要滚动的锚点
    if (location.pathname === '/' && location.state?.scrollTo) {
      const anchor = location.state.scrollTo;
      const el = document.getElementById(anchor);
      if (el) {
        // 使用setTimeout确保在DOM更新后滚动
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      // 清除state，避免刷新后重复滚动
      window.history.replaceState({}, '', '/');
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{t('siteTitle')}</title>
        <meta name="description" content={t('siteDescription')} />
        <meta name="keywords" content={t('siteKeywords')} />
        <meta property="og:title" content={t('siteTitle')} />
        <meta property="og:description" content={t('siteDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://savemy.love" />
        <meta property="og:image" content="https://savemy.love/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('siteTitle')} />
        <meta name="twitter:description" content={t('siteDescription')} />
        <meta name="twitter:image" content="https://savemy.love/og-image.jpg" />
        <link rel="canonical" href="https://savemy.love" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": t('siteTitle'),
            "description": t('siteDescription'),
            "url": "https://savemy.love",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://savemy.love/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
          <main>
          <Routes>
            <Route path="/" element={
              <>
            <Hero />
            <FeaturedTools />
            <ConsultationAreas />
            <AISection />
              </>
            } />
            <Route path="/love-calculator" element={<LoveCalculator />} />
            <Route path="/name-compatibility" element={<NameCompatibility />} />
            <Route path="/zodiac-match" element={<ZodiacMatch />} />
            <Route path="/pursuit-strategy" element={<PursuitStrategy />} />
            <Route path="/chat-analysis" element={<ChatAnalysis />} />
            <Route path="/reconciliation-assessment" element={<ReconciliationAssessment />} />
            <Route path="/emotional-health" element={<EmotionalHealth />} />
            <Route path="/unrequited-love" element={<UnrequitedLove />} />
            <Route path="/relationship-anxiety" element={<RelationshipAnxiety />} />
            <Route path="/breakup-recovery" element={<BreakupRecovery />} />
            <Route path="/emotional-healing" element={<EmotionalHealing />} />
            <Route path="/ai-chat" element={<AIChatPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;