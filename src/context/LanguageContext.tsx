import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the Language Context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<string, Record<Language, string>> = {
  // Header
  "tools": { zh: "爱情测算", en: "Love Calculator" },
  "areas": { zh: "情感咨询", en: "Consultation" },
  "aiChat": { zh: "AI对话模拟", en: "AI Chat" },
  "startConsultation": { zh: "开始咨询", en: "Start Consultation" },
  // Hero
  "heroTitle1": { zh: "爱情的问题，", en: "Love problems," },
  "heroTitle2": { zh: "我们来解决。", en: "we solve them." },
  "heroQuote": { zh: "莫让爱生尘", en: "Don't let love gather dust" },
  "heroDesc": { zh: "SaveMyLove 通过专业分析和AI技术，帮助你在情感困境中找到方向，获得专业指导和温暖陪伴。", en: "SaveMyLove helps you find direction in emotional difficulties through professional analysis and AI technology, providing expert guidance and warm companionship." },
  "startAnalysis": { zh: "开始分析", en: "Start Analysis" },
  "consultExpert": { zh: "咨询专家", en: "Consult Expert" },
  // Tools
  "toolsTitle": { zh: "爱情测算工具", en: "Love Analysis Tools" },
  "toolsDesc": { zh: "通过我们科学的测算工具，了解你们的关系现状，获取个性化的爱情分析", en: "Understand your relationship status and get personalized love analysis through our scientific tools" },
  "nameCompat": { zh: "姓名缘分测算", en: "Name Compatibility" },
  "nameCompatDesc": { zh: "基于双方姓名的能量场分析，探索你们之间的缘分指数和相处模式。", en: "Explore your compatibility index and interaction patterns based on energy field analysis of both names." },
  "zodiac": { zh: "星座匹配分析", en: "Zodiac Compatibility" },
  "zodiacDesc": { zh: "深入分析双方星座特质，揭示潜在的性格互补和可能的冲突点。", en: "In-depth analysis of zodiac traits, revealing potential character complementarity and possible conflict points." },
  "strategy": { zh: "个性化追求攻略", en: "Personalized Pursuit Strategy" },
  "strategyDesc": { zh: "根据对方性格特点，量身定制高效的追求策略和表达方式。", en: "Customized pursuit strategies and expression methods based on your partner's personality traits." },
  "reconcileEval": { zh: "挽回可能性评估", en: "Reconciliation Possibility Assessment" },
  "reconcileEvalDesc": { zh: "多维度评估分手原因和挽回机会，提供科学的可能性预测。", en: "Multi-dimensional assessment of breakup reasons and reconciliation opportunities, providing scientific possibility predictions." },
  "emotionalHealth": { zh: "情感健康检测", en: "Emotional Health Detection" },
  "emotionalHealthDesc": { zh: "评估你的情感健康状态，识别潜在的依赖或不安全依恋模式。", en: "Evaluate your emotional health status, identifying potential dependency or insecure attachment patterns." },
  "useNow": { zh: "立即使用", en: "Use Now" },
  // Areas
  "areasTitle": { zh: "情感咨询领域", en: "Consultation Areas" },
  "areasDesc": { zh: "无论你处于爱情的哪个阶段，我们都能提供专业的分析和建议，帮助你走出困境", en: "No matter what stage of love you're in, we can provide professional analysis and advice to help you overcome difficulties" },
  "unrequited": { zh: "想要而不可得", en: "Unrequited Love" },
  "unrequitedDesc": { zh: "针对单相思、暗恋或追求未果的情况，提供科学的分析和高效的追求策略，提升成功率。", en: "Scientific analysis and effective pursuit strategies for one-sided love, secret crushes or unsuccessful pursuit, improving success rate." },
  "insecure": { zh: "患得患失", en: "Relationship Insecurity" },
  "insecureDesc": { zh: "当关系处于不稳定状态，帮助你理清思路，找出不安全感的根源，建立健康的亲密关系。", en: "When the relationship is unstable, we help you clarify your thoughts, find the root of insecurity, and establish a healthy intimate relationship." },
  "breakup": { zh: "分手挽回", en: "Breakup Recovery" },
  "breakupDesc": { zh: "分析分手原因，评估挽回可能性，提供个性化的挽回方案，指导你一步步实施。", en: "Analyze breakup reasons, evaluate reconciliation possibilities, provide personalized recovery plans, and guide you through implementation." },
  "repair": { zh: "情感修复", en: "Emotional Repair" },
  "repairDesc": { zh: "针对感情中的创伤、背叛或信任危机，提供专业的修复方法，重建健康的关系。", en: "Professional repair methods for emotional trauma, betrayal, or trust Crisis, rebuilding healthy relationships." },
  "learnMore": { zh: "了解更多", en: "Learn More" },
  // AI Chat
  "aiChatTitle": { zh: "AI情感助手", en: "AI Emotional Assistant" },
  "aiChatDesc": { zh: "与AI助手进行实时对话，获取专业的情感建议和指导", en: "Have real-time conversations with our AI assistant for professional emotional guidance" },
  "aiGreeting": { zh: "你好！我是你的AI情感助手。请告诉我你现在的情感困扰，我会尽力帮助你。", en: "Hello! I'm your AI emotional assistant. Please tell me about your emotional concerns, and I'll do my best to help you." },
  "userMessage": { zh: "我想模拟一下如何向对方表达我的感受，但又不显得太强势或有压力。", en: "I'd like to simulate how to express my feelings without seeming too forceful or pressuring." },
  "aiResponse": { zh: "很好的选择！让我们模拟这个场景。你可以先试着表达一下，我会给你反馈。", en: "Great choice! Let's simulate this scenario. You can try expressing yourself first, and I'll give you feedback." },
  "typeMessage": { zh: "输入你的问题...", en: "Type your question..." },
  "commSkills": { zh: "提升你的沟通能力", en: "Improve Your Communication Skills" },
  "commDesc": { zh: "无论是追求、维系还是挽回感情，有效的沟通都是关键。我们的AI对话模拟系统可以帮助你：", en: "Effective communication is key whether you're pursuing, maintaining, or recovering a relationship. Our AI dialogue simulation system can help you:" },
  "situational": { zh: "情境对话练习", en: "Situational Dialogue Practice" },
  "situationalDesc": { zh: "模拟各种感情场景下的对话，练习表达方式和应对技巧。", en: "Simulate dialogues in various emotional scenarios, practice expression methods and response techniques." },
  "realtime": { zh: "实时反馈", en: "Real-time Feedback" },
  "realtimeDesc": { zh: "AI分析你的表达方式，提供改进建议和更有效的沟通策略。", en: "AI analyzes your expression, providing improvement suggestions and more effective communication strategies." },
  "personalized": { zh: "个性化指导", en: "Personalized Guidance" },
  "personalizedDesc": { zh: "根据你的沟通风格和目标，提供量身定制的指导和练习。", en: "Provides tailored guidance and exercises based on your communication style and goals." },
  "startTraining": { zh: "开始对话训练", en: "Start Dialogue Training" },
  // Footer
  "consultationServices": { zh: "专业情感咨询服务，通过科学分析和AI技术，帮助你解决爱情难题。", en: "Professional emotional consultation services, helping you solve love problems through scientific analysis and AI technology." },
  "loveCal": { zh: "爱情测算", en: "Love Calculator" },
  "nameComp": { zh: "姓名缘分测算", en: "Name Compatibility" },
  "zodiacMatch": { zh: "星座匹配分析", en: "Zodiac Compatibility Analysis" },
  "zodiacMatchDescription": { zh: "通过分析双方的星座和出生日期，深入了解你们的星座相性、性格特点和潜在的感情发展。", en: "Analyze your zodiac compatibility and potential relationship development through both parties' zodiac signs and birth dates." },
  "yourZodiac": { zh: "你的星座", en: "Your Zodiac Sign" },
  "partnerZodiac": { zh: "对方的星座", en: "Partner's Zodiac Sign" },
  "selectZodiac": { zh: "请选择星座", en: "Select Zodiac Sign" },
  "yourBirthDate": { zh: "你的出生日期", en: "Your Birth Date" },
  "partnerBirthDate": { zh: "对方的出生日期", en: "Partner's Birth Date" },
  "affIndex": { zh: "缘分指数计算", en: "Affinity Index" },
  "pursuitStrat": { zh: "个性化追求攻略", en: "Custom Pursuit Strategy" },
  "emotConsult": { zh: "情感咨询", en: "Emotional Consultation" },
  "unrequitedLove": { zh: "想要而不可得", en: "Unrequited Love" },
  "insecurity": { zh: "患得患失", en: "Relationship Insecurity" },
  "reconciliation": { zh: "分手挽回", en: "Breakup Recovery" },
  "emotRepair": { zh: "情感修复", en: "Emotional Repair" },
  "contactUs": { zh: "联系我们", en: "Contact Us" },
  "newsletter": { zh: "订阅爱情锦囊", en: "Subscribe to Love Tips" },
  "newsletterDesc": { zh: "定期获取情感维护技巧、关系建设指南和专家建议，成为爱情赢家。", en: "Regularly receive emotional maintenance tips, relationship building guides, and expert advice to become a love winner." },
  "emailPlaceholder": { zh: "您的邮箱地址", en: "Your email address" },
  "subscribe": { zh: "订阅", en: "Subscribe" },
  "copyright": { zh: "版权所有 © 2025 SaveMyLove. 保留所有权利。", en: "Copyright © 2025 SaveMyLove. All rights reserved." },
  "privacy": { zh: "隐私政策", en: "Privacy Policy" },
  "terms": { zh: "服务条款", en: "Terms of Service" },
  "langSwitch": { zh: "English", en: "中文" },
  // Name Compatibility
  "nameCompatTitle": { zh: "姓名缘分测算", en: "Name Compatibility Analysis" },
  "nameCompatibility": { zh: "姓名缘分测算", en: "Name Compatibility" },
  "nameCompatibilityDescription": { zh: "通过分析双方姓名的能量场，探索你们之间的缘分指数和相处模式。", en: "Explore your compatibility index and interaction patterns through the energy field analysis of both names." },
  "yourName": { zh: "你的名字", en: "Your Name" },
  "partnerName": { zh: "对方名字", en: "Partner's Name" },
  "enterYourName": { zh: "请输入你的名字", en: "Enter your name" },
  "enterPartnerName": { zh: "请输入对方的名字", en: "Enter partner's name" },
  "analyzing": { zh: "思考中...", en: "Thinking..." },
  "analyze": { zh: "开始分析", en: "Analyze" },
  "analysisResult": { zh: "分析结果", en: "Analysis Result" },
  "errorOccurred": { zh: "抱歉，发生了一些错误。请稍后再试。", en: "Sorry, an error occurred. Please try again later." },
  "markdownLoadingTip": { zh: "内容生成中，部分格式可能未完全", en: "Generating, some formatting may be incomplete" },
  // 个性化追求攻略
  "pursuitStrategy": { 
    zh: "个性化追求攻略", 
    en: "Personalized Pursuit Strategy" 
  },
  "pursuitStrategyDesc": { 
    zh: "根据对方性格特点，量身定制高效的追求策略和表达方式。", 
    en: "Customized pursuit strategies and expression methods based on the target's personality traits." 
  },
  "targetPersonality": { 
    zh: "目标对象性格特点", 
    en: "Target's Personality Traits" 
  },
  "targetPersonalityPlaceholder": { 
    zh: "请描述对方的性格特点、兴趣爱好、价值观等", 
    en: "Describe the target's personality traits, interests, values, etc." 
  },
  "relationshipStatus": { 
    zh: "当前关系状态", 
    en: "Current Relationship Status" 
  },
  "relationshipStatusPlaceholder": { 
    zh: "请描述你们目前的关系状态（如：普通朋友、同事、同学等）", 
    en: "Describe your current relationship status (e.g., friends, colleagues, classmates)" 
  },
  "interactionFrequency": { 
    zh: "互动频率", 
    en: "Interaction Frequency" 
  },
  "interactionFrequencyPlaceholder": { 
    zh: "请描述你们目前的互动频率和方式", 
    en: "Describe your current interaction frequency and methods" 
  },
  "commonInterests": { 
    zh: "共同兴趣", 
    en: "Common Interests" 
  },
  "commonInterestsPlaceholder": { 
    zh: "请描述你们的共同兴趣和话题", 
    en: "Describe your common interests and topics" 
  },
  "challenges": { 
    zh: "面临的挑战", 
    en: "Challenges" 
  },
  "challengesPlaceholder": { 
    zh: "请描述在追求过程中遇到的挑战或困难", 
    en: "Describe the challenges or difficulties in the pursuit process" 
  },
  "generateStrategy": { 
    zh: "生成追求策略", 
    en: "Generate Pursuit Strategy" 
  },
  // 聊天记录分析
  "chatAnalysis": { 
    zh: "聊天记录分析", 
    en: "Chat History Analysis" 
  },
  "chatAnalysisDesc": { 
    zh: "上传聊天记录，AI深度分析交流模式，找出沟通障碍和改进点。", 
    en: "Upload chat history for AI to analyze communication patterns and identify improvement areas." 
  },
  "uploadChatFile": { 
    zh: "上传聊天记录文件", 
    en: "Upload Chat History File" 
  },
  "supportedFormats": { 
    zh: "支持.txt或.json格式", 
    en: "Supports .txt or .json format" 
  },
  "selectedFile": { 
    zh: "已选择文件", 
    en: "Selected File" 
  },
  "chatContent": { 
    zh: "聊天内容", 
    en: "Chat Content" 
  },
  "chatContentPlaceholder": { 
    zh: "请粘贴聊天记录或上传文件", 
    en: "Paste chat history or upload a file" 
  },
  "analyzeChat": { 
    zh: "分析聊天记录", 
    en: "Analyze Chat History" 
  },
  
  // 挽回可能性评估
  "assessmentResult": { 
    zh: "分析结果", 
    en: "Assessment Result" 
  },
  "reconciliationAssessment": { 
    zh: "挽回可能性评估", 
    en: "Reconciliation Possibility Assessment" 
  },
  "reconciliationAssessmentDesc": { 
    zh: "多维度评估分手原因和挽回机会，提供科学的可能性预测。", 
    en: "Multi-dimensional assessment of breakup reasons and reconciliation possibilities." 
  },
  "breakupReason": { 
    zh: "分手原因", 
    en: "Breakup Reason" 
  },
  "breakupReasonPlaceholder": { 
    zh: "请详细描述分手的原因和经过", 
    en: "Describe the reason and process of the breakup in detail" 
  },
  "breakupTime": { 
    zh: "分手时间", 
    en: "Breakup Time" 
  },
  "breakupTimePlaceholder": { 
    zh: "请说明分手已经过去多久", 
    en: "How long has it been since the breakup" 
  },
  "currentContact": { 
    zh: "当前联系状态", 
    en: "Current Contact Status" 
  },
  "currentContactPlaceholder": { 
    zh: "请描述你们目前的联系状态", 
    en: "Describe your current contact status" 
  },
  "mutualFriends": { 
    zh: "共同朋友情况", 
    en: "Mutual Friends" 
  },
  "mutualFriendsPlaceholder": { 
    zh: "请描述你们的共同朋友情况", 
    en: "Describe your mutual friends situation" 
  },
  "pastIssues": { 
    zh: "过去的问题", 
    en: "Past Issues" 
  },
  "pastIssuesPlaceholder": { 
    zh: "请描述你们关系中存在的主要问题", 
    en: "Describe the main issues in your relationship" 
  },
  "changesMade": { 
    zh: "已做出的改变", 
    en: "Changes Made" 
  },
  "changesMadePlaceholder": { 
    zh: "请描述分手后你做出的改变", 
    en: "Describe the changes you've made since the breakup" 
  },
  "assessReconciliation": { 
    zh: "评估挽回可能性", 
    en: "Assess Reconciliation Possibility" 
  },
  "relationshipPatterns": { 
    zh: "关系模式", 
    en: "Relationship Patterns" 
  },
  "relationshipPatternsPlaceholder": { 
    zh: "请描述你在关系中的行为模式和习惯", 
    en: "Describe your behavioral patterns and habits in relationships" 
  },
  "emotionalTriggers": { 
    zh: "情感触发点", 
    en: "Emotional Triggers" 
  },
  "emotionalTriggersPlaceholder": { 
    zh: "请描述容易触发你情绪波动的情况", 
    en: "Describe situations that easily trigger your emotional fluctuations" 
  },
  "attachmentStyle": { 
    zh: "依恋风格", 
    en: "Attachment Style" 
  },
  "attachmentStylePlaceholder": { 
    zh: "请描述你在亲密关系中的依恋风格", 
    en: "Describe your attachment style in intimate relationships" 
  },
  "selfEsteem": { 
    zh: "自尊水平", 
    en: "Self-Esteem" 
  },
  "selfEsteemPlaceholder": { 
    zh: "请描述你的自尊水平和自我认知", 
    en: "Describe your self-esteem level and self-awareness" 
  },
  "communicationStyle": { 
    zh: "沟通方式", 
    en: "Communication Style" 
  },
  "communicationStylePlaceholder": { 
    zh: "请描述你在关系中的沟通方式", 
    en: "Describe your communication style in relationships" 
  },
  "copingMechanisms": { 
    zh: "应对机制", 
    en: "Coping Mechanisms" 
  },
  "copingMechanismsPlaceholder": { 
    zh: "请描述你在面对情感问题时的应对方式", 
    en: "Describe how you cope with emotional issues" 
  },
  "assessEmotionalHealth": { 
    zh: "评估情感健康", 
    en: "Assess Emotional Health" 
  },
  // 单相思页面
  "unrequitedLoveAnalysis": { 
    zh: "单相思分析", 
    en: "Unrequited Love Analysis" 
  },
  "yourFeelings": { 
    zh: "你的感受", 
    en: "Your Feelings" 
  },
  "describeFeelings": { 
    zh: "请描述你对对方的感受和想法", 
    en: "Please describe your feelings and thoughts about the person" 
  },
  "currentSituation": { 
    zh: "当前状况", 
    en: "Current Situation" 
  },
  "describeSituation": { 
    zh: "请描述你们目前的关系状况", 
    en: "Please describe your current relationship situation" 
  },
  "interactions": { 
    zh: "互动情况", 
    en: "Interactions" 
  },
  "describeInteractions": { 
    zh: "请描述你们之间的互动情况", 
    en: "Please describe your interactions with each other" 
  },
  "hopesAndFears": { 
    zh: "期望与担忧", 
    en: "Hopes and Fears" 
  },
  "describeHopes": { 
    zh: "请描述你的期望和担忧", 
    en: "Please describe your hopes and fears" 
  },
  "selfReflection": { 
    zh: "自我反思", 
    en: "Self Reflection" 
  },
  "describeSelfReflection": { 
    zh: "请描述你对自己的反思", 
    en: "Please describe your self-reflection" 
  },

  // 关系焦虑页面
  "relationshipAnxiety": { 
    zh: "关系焦虑分析", 
    en: "Relationship Anxiety Analysis" 
  },
  "relationshipAnxietyDesc": { 
    zh: "分析你在关系中的焦虑情绪，找出根源并提供改善建议", 
    en: "Analyze your anxiety in relationships, identify root causes and provide improvement suggestions" 
  },
  "anxietyTriggers": { 
    zh: "焦虑触发点", 
    en: "Anxiety Triggers" 
  },
  "anxietyTriggersPlaceholder": { 
    zh: "请描述什么情况会触发你的焦虑", 
    en: "Please describe what situations trigger your anxiety" 
  },
  "communicationPatterns": { 
    zh: "沟通模式", 
    en: "Communication Patterns" 
  },
  "communicationPatternsPlaceholder": { 
    zh: "请描述你们之间的沟通模式", 
    en: "Please describe your communication patterns" 
  },
  "trustIssues": { 
    zh: "信任问题", 
    en: "Trust Issues" 
  },
  "trustIssuesPlaceholder": { 
    zh: "请描述你们之间的信任问题", 
    en: "Please describe trust issues between you" 
  },
  "personalHistory": { 
    zh: "个人历史", 
    en: "Personal History" 
  },
  "personalHistoryPlaceholder": { 
    zh: "请描述你的情感经历", 
    en: "Please describe your emotional history" 
  },
  "copingMethods": { 
    zh: "应对方式", 
    en: "Coping Methods" 
  },
  "copingMethodsPlaceholder": { 
    zh: "请描述你目前的应对方式", 
    en: "Please describe your current coping methods" 
  },
  "getAnalysis": { 
    zh: "获取分析", 
    en: "Get Analysis" 
  },

  // 分手挽回页面
  "breakupRecoveryAnalysis": { 
    zh: "分手挽回分析", 
    en: "Breakup Recovery Analysis" 
  },
  "currentFeelings": { 
    zh: "当前感受", 
    en: "Current Feelings" 
  },
  "describeCurrentFeelings": { 
    zh: "请描述你目前的感受", 
    en: "Please describe your current feelings" 
  },
  "contactStatus": { 
    zh: "联系状态", 
    en: "Contact Status" 
  },
  "describeContactStatus": { 
    zh: "请描述你们目前的联系状态", 
    en: "Please describe your current contact status" 
  },
  "mutualConnections": { 
    zh: "共同联系", 
    en: "Mutual Connections" 
  },
  "describeMutualConnections": { 
    zh: "请描述你们的共同联系", 
    en: "Please describe your mutual connections" 
  },
  "personalGrowth": { 
    zh: "个人成长", 
    en: "Personal Growth" 
  },
  "describePersonalGrowth": { 
    zh: "请描述分手后的个人成长", 
    en: "Please describe your personal growth after the breakup" 
  },
  "reconciliationDesire": { 
    zh: "挽回意愿", 
    en: "Reconciliation Desire" 
  },
  "describeReconciliationDesire": { 
    zh: "请描述你的挽回意愿和期望", 
    en: "Please describe your desire and expectations for reconciliation" 
  },

  // 情感修复页面
  "emotionalHealing": { 
    zh: "情感修复", 
    en: "Emotional Healing" 
  },
  "emotionalHealingDesc": { 
    zh: "帮助你修复情感创伤，重建健康的亲密关系", 
    en: "Help you heal emotional wounds and rebuild healthy intimate relationships" 
  },
  "emotionalWounds": { 
    zh: "情感创伤", 
    en: "Emotional Wounds" 
  },
  "emotionalWoundsPlaceholder": { 
    zh: "请描述你经历的情感创伤", 
    en: "Please describe the emotional wounds you've experienced" 
  },
  "communicationProblems": { 
    zh: "沟通问题", 
    en: "Communication Problems" 
  },
  "communicationProblemsPlaceholder": { 
    zh: "请描述你们之间的沟通问题", 
    en: "Please describe communication problems between you" 
  },
  "relationshipGoals": { 
    zh: "关系目标", 
    en: "Relationship Goals" 
  },
  "relationshipGoalsPlaceholder": { 
    zh: "请描述你对关系的期望和目标", 
    en: "Please describe your expectations and goals for the relationship" 
  },
  "healingProgress": { 
    zh: "修复进展", 
    en: "Healing Progress" 
  },
  "healingProgressPlaceholder": { 
    zh: "请描述目前的修复进展", 
    en: "Please describe your current healing progress" 
  },
  "getHealingPlan": { 
    zh: "获取修复方案", 
    en: "Get Healing Plan" 
  },
  // AI Chat
  online: { zh: "在线", en: "Online" },
  you: { zh: "你", en: "You" },
  openNewChat: { zh: "在新窗口中打开聊天", en: "Open chat in new window" },
  back: { zh: "返回", en: "Back" },
  // Privacy Policy
  "privacyPolicy": { zh: "隐私政策", en: "Privacy Policy" },
  "privacyPolicyIntro": { 
    zh: "SaveMyLove 非常重视您的隐私。本隐私政策说明了我们如何收集、使用和保护您的个人信息。", 
    en: "SaveMyLove takes your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information." 
  },
  "informationCollection": { zh: "信息收集", en: "Information Collection" },
  "informationCollectionDesc": { 
    zh: "我们收集的信息包括但不限于：姓名、年龄、联系方式、情感状态等。这些信息仅用于提供更好的服务。", 
    en: "The information we collect includes but is not limited to: name, age, contact information, emotional status, etc. This information is used solely to provide better services." 
  },
  "informationUsage": { zh: "信息使用", en: "Information Usage" },
  "informationUsageDesc": { 
    zh: "我们使用收集的信息来提供个性化服务、改善用户体验、进行数据分析，以及发送重要通知。", 
    en: "We use the collected information to provide personalized services, improve user experience, conduct data analysis, and send important notifications." 
  },
  "dataSecurity": { zh: "数据安全", en: "Data Security" },
  "dataSecurityDesc": { 
    zh: "我们采用行业标准的安全措施来保护您的个人信息，包括加密传输、安全存储和访问控制。", 
    en: "We employ industry-standard security measures to protect your personal information, including encrypted transmission, secure storage, and access control." 
  },
  "cookies": { zh: "Cookie 使用", en: "Cookies" },
  "cookiesDesc": { 
    zh: "我们使用 Cookie 来改善网站功能、分析使用情况并提供个性化体验。您可以通过浏览器设置管理 Cookie。", 
    en: "We use cookies to improve website functionality, analyze usage, and provide personalized experiences. You can manage cookies through your browser settings." 
  },
  "thirdParty": { zh: "第三方服务", en: "Third-Party Services" },
  "thirdPartyDesc": { 
    zh: "我们可能与第三方服务提供商合作，这些提供商有各自的隐私政策。我们建议您查看他们的政策。", 
    en: "We may work with third-party service providers who have their own privacy policies. We recommend reviewing their policies." 
  },
  "userRights": { zh: "用户权利", en: "User Rights" },
  "userRightsDesc": { 
    zh: "您有权访问、更正或删除您的个人信息。如需行使这些权利，请联系我们的客服。", 
    en: "You have the right to access, correct, or delete your personal information. To exercise these rights, please contact our customer service." 
  },
  "policyUpdates": { zh: "政策更新", en: "Policy Updates" },
  "policyUpdatesDesc": { 
    zh: "我们可能会不时更新本隐私政策。更新后的政策将在网站上公布，并注明生效日期。", 
    en: "We may update this Privacy Policy from time to time. Updated policies will be posted on the website with the effective date." 
  },
  "privacyContactDesc": { 
    zh: "如果您对本隐私政策有任何疑问，请通过以下方式联系我们：contact@savemy.love", 
    en: "If you have any questions about this Privacy Policy, please contact us at: contact@savemy.love" 
  },

  // Terms of Service
  "termsOfService": { zh: "服务条款", en: "Terms of Service" },
  "termsIntro": { 
    zh: "欢迎使用 SaveMyLove 服务。使用我们的服务即表示您同意遵守以下条款和条件。", 
    en: "Welcome to SaveMyLove. By using our services, you agree to comply with the following terms and conditions." 
  },
  "serviceDescription": { zh: "服务说明", en: "Service Description" },
  "serviceDescriptionDesc": { 
    zh: "SaveMyLove 提供情感咨询、爱情测算和 AI 对话服务。我们的服务仅供个人使用，不得用于商业目的。", 
    en: "SaveMyLove provides emotional consultation, love calculation, and AI chat services. Our services are for personal use only and not for commercial purposes." 
  },
  "userObligations": { zh: "用户义务", en: "User Obligations" },
  "userObligationsDesc": { 
    zh: "用户应提供真实、准确的信息，不得从事任何违法或损害他人利益的行为。", 
    en: "Users should provide truthful and accurate information and must not engage in any illegal or harmful activities." 
  },
  "intellectualProperty": { zh: "知识产权", en: "Intellectual Property" },
  "intellectualPropertyDesc": { 
    zh: "网站上的所有内容，包括但不限于文字、图片、设计等，均受知识产权法保护。", 
    en: "All content on the website, including but not limited to text, images, and designs, is protected by intellectual property laws." 
  },
  "limitationOfLiability": { zh: "责任限制", en: "Limitation of Liability" },
  "limitationOfLiabilityDesc": { 
    zh: "我们对因使用服务而产生的任何直接或间接损失不承担责任。", 
    en: "We are not liable for any direct or indirect losses resulting from the use of our services." 
  },
  "termination": { zh: "服务终止", en: "Termination" },
  "terminationDesc": { 
    zh: "我们保留随时终止或暂停服务的权利，恕不另行通知。", 
    en: "We reserve the right to terminate or suspend services at any time without prior notice." 
  },
  "governingLaw": { zh: "适用法律", en: "Governing Law" },
  "governingLawDesc": { 
    zh: "本条款受中华人民共和国法律管辖。", 
    en: "These terms are governed by the laws of the People's Republic of China." 
  },
  "changesToTerms": { zh: "条款变更", en: "Changes to Terms" },
  "changesToTermsDesc": { 
    zh: "我们保留随时修改本条款的权利。修改后的条款将在网站上公布。", 
    en: "We reserve the right to modify these terms at any time. Modified terms will be posted on the website." 
  },
  "termsContactDesc": { 
    zh: "如果您对本服务条款有任何疑问，请通过以下方式联系我们：contact@savemy.love", 
    en: "If you have any questions about these Terms of Service, please contact us at: contact@savemy.love" 
  },
  // SEO
  "siteTitle": { 
    zh: "SaveMyLove - 爱情测算与情感咨询平台", 
    en: "SaveMyLove - Love Calculator and Emotional Consultation Platform" 
  },
  "siteDescription": { 
    zh: "SaveMyLove 提供专业的爱情测算、姓名配对和情感咨询服务，帮助您找到真爱，解决情感问题。", 
    en: "SaveMyLove provides professional love calculation, name compatibility, and emotional consultation services to help you find true love and solve emotional problems." 
  },
  "siteKeywords": { 
    zh: "爱情测算,姓名配对,情感咨询,AI对话,情感治愈,爱情测试,缘分测试", 
    en: "love calculator, name compatibility, emotional consultation, AI chat, emotional healing, love test, fate test" 
  },
  // Page specific SEO
  "loveCalculatorTitle": { 
    zh: "爱情测算 - SaveMyLove", 
    en: "Love Calculator - SaveMyLove" 
  },
  "loveCalculatorDescription": { 
    zh: "使用我们的爱情测算工具，输入双方信息，获取专业的爱情匹配度分析报告。", 
    en: "Use our love calculator tool, enter information for both parties, and get a professional love compatibility analysis report." 
  },
  "nameCompatibilityTitle": { 
    zh: "姓名配对 - SaveMyLove", 
    en: "Name Compatibility - SaveMyLove" 
  },
  "emotionalHealingTitle": { 
    zh: "情感治愈 - SaveMyLove", 
    en: "Emotional Healing - SaveMyLove" 
  },
  "emotionalHealingDescription": { 
    zh: "专业的情感治愈服务，帮助您走出情感困境，重获幸福。", 
    en: "Professional emotional healing services to help you overcome emotional difficulties and regain happiness." 
  },
  "aiChatDescription": { 
    zh: "与我们的 AI 情感助手对话，获得专业的情感建议和支持。", 
    en: "Chat with our AI emotional assistant to get professional emotional advice and support." 
  },
};

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Try to get language from localStorage, default to Chinese if not found
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      return savedLanguage === 'en' ? 'en' : 'zh';
    }
    return 'zh';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string) => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};