import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, MessageCircleHeart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const testimonials = [
  {
    name: 'H先生',
    age: 5,
    status: '2025年5月1日',
    content: '通过SaveMyLove的分析，我才明白我们沟通中的问题所在。经过三天的AI对话练习和策略执行，学会了放手！',
    rating: 5
  },
  {
    name: 'Z女士',
    age: 3,
    status: '2025年5月1日',
    content: '没用SaveMyLove的分析，离开了错的人，找到了真爱',
    rating: 5
  }
];

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 300); // 等待淡出动画完成
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
        
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block mb-2 text-gray-900">{t('heroTitle1')}</span>
              <span className="block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                {t('heroTitle2')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl italic text-gray-600 font-light">
              "{t('heroQuote')}"
            </p>
            
            <p className="text-gray-600 max-w-lg">
              {t('heroDesc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#tools" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md transition-all"
              >
                {t('startAnalysis')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              
              {/* <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all"
              >
                {t('consultExpert')}
                <MessageCircleHeart className="ml-2 h-5 w-5 text-pink-500" />
              </a> */}
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/70 to-purple-100/70"></div>
              
              {/* Decorative hearts */}
              <div className="absolute top-10 right-10 animate-pulse">
                <Heart className="h-8 w-8 text-pink-400" fill="#F9A8D4" />
              </div>
              <div className="absolute bottom-20 left-10 animate-pulse" style={{ animationDelay: '1s' }}>
                <Heart className="h-6 w-6 text-pink-300" fill="#F9A8D4" />
              </div>
              <div className="absolute top-1/2 right-20 animate-pulse" style={{ animationDelay: '1.5s' }}>
                <Heart className="h-5 w-5 text-purple-300" fill="#DDD6FE" />
              </div>
              
              {/* Stacked testimonials */}
              <div className="relative h-full">
                {testimonials.map((testimonial, index) => {
                  const isActive = index === currentTestimonial;
                  const isNext = index === (currentTestimonial + 1) % testimonials.length;
                  const isPrev = index === (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                  
                  // 为每张卡片生成随机旋转角度
                  const rotation = index * 3 - 3; // 每张卡片相差3度
                  const randomOffset = Math.random() * 20 - 10; // -10到10之间的随机偏移
                  
                  return (
                    <div
                      key={index}
                      className={`absolute w-full max-w-sm mx-auto transition-all duration-500 ${
                        isActive
                          ? 'opacity-100 z-20'
                          : isNext
                          ? 'opacity-80 z-10'
                          : isPrev
                          ? 'opacity-80 z-10'
                          : 'opacity-60 z-0'
                      }`}
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) ${
                          isActive 
                            ? 'scale(1) translateY(0) rotate(0deg)' 
                            : isNext 
                            ? `scale(0.95) translateY(20px) rotate(${rotation + randomOffset}deg)` 
                            : isPrev 
                            ? `scale(0.95) translateY(-20px) rotate(${rotation + randomOffset}deg)` 
                            : `scale(0.9) translateY(40px) rotate(${rotation + randomOffset}deg)`
                        }`,
                        filter: isActive ? 'none' : 'blur(1px)',
                      }}
                    >
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-pink-100">
                        <div className="flex items-center mb-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">
                              {testimonial.name}，{testimonial.age}岁
                            </h3>
                            <p className="text-xs text-gray-500">{testimonial.status}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">
                          "{testimonial.content}"
                        </p>
                        <div className="mt-4 flex">
                          {Array(testimonial.rating).fill(0).map((_, i) => (
                            <Heart 
                              key={i} 
                              className="h-4 w-4 text-pink-500 mr-1" 
                              fill="#EC4899"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;