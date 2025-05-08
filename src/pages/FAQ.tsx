import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';

const FAQ: React.FC = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq.question1'),
      answer: t('faq.answer1')
    },
    {
      question: t('faq.question2'),
      answer: t('faq.answer2')
    },
    {
      question: t('faq.question3'),
      answer: t('faq.answer3')
    },
    {
      question: t('faq.question4'),
      answer: t('faq.answer4')
    },
    {
      question: t('faq.question5'),
      answer: t('faq.answer5')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>{t('faq.title')} - SaveMyLove</title>
        <meta name="description" content={t('faq.description')} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            {t('faq.contactText')}
          </p>
          <a
            href="mailto:support@savemy.love"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-colors"
          >
            {t('faq.contactButton')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 