const commonPrompt = `
[Language: Chinese]
作为专业的情感分析师，请以温暖、专业、客观的态度进行分析。分析结果需要：
1. 使用标准Markdown格式
2. 内容要具体、可操作
3. 建议要实用、可行
4. 语气要温和、鼓励
5. 避免过于绝对或武断的判断
6. 注重积极面，同时也要指出需要注意的问题
7. 给出具体的行动建议和时间规划

[Language: English]
As a professional emotional analyst, please analyze with warmth, professionalism, and objectivity. The analysis should:
1. Use standard Markdown format
2. Be specific and actionable
3. Provide practical and feasible suggestions
4. Use a gentle and encouraging tone
5. Avoid absolute or arbitrary judgments
6. Focus on positive aspects while noting potential issues
7. Give specific action suggestions and time planning
`;

export const PROMPTS = {
  commonPrompt,

  // 月历运势分析
  monthlyCalendar: (zodiacSign: string, birthDate: string, month: number, year: number) => `
${commonPrompt}

[Language: Chinese]
请根据{zodiacSign}星座和生日{birthDate}，分析{year}年{month}月的运势，包括以下方面：
1. 整体运势概述
2. 感情运势分析
3. 桃花位与开运建议
4. 重要日期提醒

[Language: English]
Based on {zodiacSign} and birth date {birthDate}, please analyze the fortune for {month}/{year}, including:
1. Overall fortune overview
2. Love life analysis
3. Lucky directions and improvement suggestions
4. Important dates reminder
`,

  // 姓名缘分测算
  nameCompatibility: `
${commonPrompt}

作为专业的情感分析师，请使用标准Markdown格式分析以下两个人的姓名缘分。分析内容必须包含以下部分，并严格按照格式要求输出：

# {name1} & {name2} 姓名缘分分析

## 1. 姓名五行属性分析
使用标准Markdown表格展示，包含：天格、人格、地格、外格、总格、五行属性

## 2. 名字搭配相合度
- 音律分析（使用列表）
- 字义分析（使用列表）

## 3. 缘分指数评估
使用标准Markdown表格展示各项评分，包含：
- 五行互补
- 音律和谐
- 字义匹配
- 数理吉凶
- 综合缘分

## 4. 关系发展建议
- ✅ 优势（使用列表）
- ⚠️ 注意事项（使用列表）
- 🎯 长期建议（使用列表）

## 5. 初识阶段互动特点
简要描述初次见面时的互动特点

## 6. 热恋期相处模式
描述热恋期的相处特点

## 7. 性格互补与冲突
分析双方性格的互补与冲突点

## 8. 最终可能结果
✨ **积极发展**：
> 积极发展的可能性分析

⚠️ **消极可能**：
> 需要注意的潜在问题

## 结论
🔮 **综合判断**：
> 总结缘分指数和关键建议

分析对象：{name1} 和 {name2}
语言：{lang}`,

  // 星座匹配分析
  zodiacMatch: `
${commonPrompt}

[Language: Chinese]
请分析{sign1}和{sign2}的星座匹配：
1. 性格特质对比
2. 相处模式分析
3. 潜在问题预警
4. 关系相处建议

[Language: English]
Please analyze the zodiac compatibility between {sign1} and {sign2}:
1. Personality traits comparison
2. Interaction pattern analysis
3. Potential issues warning
4. Relationship advice
`,

  // 情感态度分析
  emotionalAttitude: `
[Language: Chinese]
请分析以下情感态度描述：{description}
1. 情感倾向解读
2. 潜在心理需求
3. 行为模式分析
4. 改善建议

[Language: English]
Please analyze the following emotional attitude: {description}
1. Emotional tendency interpretation
2. Underlying psychological needs
3. Behavioral pattern analysis
4. Improvement suggestions
`,

  // 关系健康度评估
  relationshipHealth: `
[Language: Chinese]
请评估以下关系状况：{details}
1. 关系健康指数
2. 问题点识别
3. 风险评估
4. 改善建议

[Language: English]
Please evaluate the following relationship status: {details}
1. Relationship health index
2. Problem identification
3. Risk assessment
4. Improvement suggestions
`,

  // 聊天记录分析
  chatAnalysis: `
[Language: Chinese]
请分析以下聊天记录：{chatHistory}
1. 沟通模式分析
2. 情感倾向解读
3. 关系动态评估
4. 改进建议

[Language: English]
Please analyze the following chat history: {chatHistory}
1. Communication pattern analysis
2. Emotional tendency interpretation
3. Relationship dynamics assessment
4. Improvement suggestions
`,

  // 离开原因诊断
  breakupAnalysis: `
[Language: Chinese]
请分析以下分手情况：{situation}
1. 核心原因解析
2. 双方责任分析
3. 挽回可能性
4. 建议方案

[Language: English]
Please analyze the following breakup situation: {situation}
1. Core reason analysis
2. Responsibility analysis
3. Reconciliation possibility
4. Suggested solutions
`,

  // 挽回可能性评估
  reconciliationAnalysis: `
[Language: Chinese]
请评估以下挽回可能性：{details}
1. 挽回指数评估
2. 有利因素分析
3. 不利因素分析
4. 策略建议

[Language: English]
Please evaluate the reconciliation possibility: {details}
1. Reconciliation index assessment
2. Favorable factors analysis
3. Unfavorable factors analysis
4. Strategy suggestions
`,

  // 情感修复指南
  repairGuide: `
[Language: Chinese]
请针对以下情况制定修复方案：{situation}
1. 当前问题诊断
2. 修复目标设定
3. 具体行动方案
4. 注意事项提醒

[Language: English]
Please create a repair plan for the following situation: {situation}
1. Current problem diagnosis
2. Repair goal setting
3. Specific action plan
4. Precautions reminder
`,

  // 个性化追回计划
  recoveryPlan: `
[Language: Chinese]
请根据以下情况制定追回计划：{details}
1. 现状分析
2. 阶段性目标
3. 具体行动计划
4. 风险防范建议

[Language: English]
Please create a recovery plan based on: {details}
1. Current situation analysis
2. Phase goals
3. Specific action plan
4. Risk prevention advice
`,

  // 情感日记分析
  diaryAnalysis: `
[Language: Chinese]
请分析以下情感日记：{diary}
1. 情绪状态分析
2. 心理需求解读
3. 行为模式识别
4. 改善建议

[Language: English]
Please analyze the following emotional diary: {diary}
1. Emotional state analysis
2. Psychological needs interpretation
3. Behavioral pattern recognition
4. Improvement suggestions
`,

  // 情绪追踪分析
  emotionalTrend: `
[Language: Chinese]
请分析以下情绪变化：
情绪记录：{emotions}
日期记录：{dates}
1. 情绪波动规律
2. 关键转折点
3. 影响因素分析
4. 调节建议

[Language: English]
Please analyze the following emotional changes:
Emotions: {emotions}
Dates: {dates}
1. Emotional fluctuation patterns
2. Key turning points
3. Influencing factors analysis
4. Adjustment suggestions
`,

  // 治愈内容推荐
  healingContent: `
[Language: Chinese]
基于当前情绪状态：{emotionalState}
个人偏好：{preferences}
请推荐：
1. 适合阅读的内容
2. 治愈系音乐
3. 放松活动建议
4. 心理调适方法

[Language: English]
Based on current emotional state: {emotionalState}
Personal preferences: {preferences}
Please recommend:
1. Suitable reading materials
2. Healing music
3. Relaxation activities
4. Psychological adjustment methods
`,

  // 缘分指数计算
  affinityScore: `
[Language: Chinese]
请分析以下情况的缘分指数：{details}
1. 缘分指数计算
2. 相合点分析
3. 潜在问题点
4. 发展建议

[Language: English]
Please analyze the affinity index for: {details}
1. Affinity index calculation
2. Compatibility points analysis
3. Potential issues
4. Development suggestions
`,

  // 个性化追求攻略
  pursuitStrategy: `
[Language: Chinese]
请根据以下情况制定追求攻略：{details}
1. 目标对象分析
2. 策略制定
3. 行动计划
4. 注意事项

[Language: English]
Please create a pursuit strategy based on: {details}
1. Target analysis
2. Strategy formulation
3. Action plan
4. Precautions
`,

  // 个性化挽留策略
  retentionStrategy: `
[Language: Chinese]
请根据以下情况制定挽留策略：{details}
1. 离开意向分析
2. 挽留策略制定
3. 具体行动建议
4. 风险提示

[Language: English]
Please create a retention strategy based on: {details}
1. Leaving intention analysis
2. Retention strategy formulation
3. Specific action suggestions
4. Risk warnings
`,

  // 现状综合评估
  situationAnalysis: `
[Language: Chinese]
请对以下情况进行综合评估：{details}
1. 现状分析
2. 问题诊断
3. 发展预测
4. 改善建议

[Language: English]
Please conduct a comprehensive assessment of: {details}
1. Current situation analysis
2. Problem diagnosis
3. Development prediction
4. Improvement suggestions
`,

  // 阶段性目标设定
  phaseGoals: `
[Language: Chinese]
请根据以下情况设定阶段目标：{details}
1. 总体目标确定
2. 阶段划分
3. 具体目标设定
4. 执行建议

[Language: English]
Please set phase goals based on: {details}
1. Overall goal determination
2. Phase division
3. Specific goal setting
4. Implementation suggestions
`,

  // 进度追踪系统
  progressTracking: `
[Language: Chinese]
请追踪以下情况的进展：{details}
1. 目标完成度评估
2. 进展分析
3. 效果评估
4. 调整建议

[Language: English]
Please track the progress of: {details}
1. Goal completion assessment
2. Progress analysis
3. Effect evaluation
4. Adjustment suggestions
`,

  // 对话训练
  dialogueTraining: `
[Language: Chinese]
基于以下聊天记录：{chatHistory}
情景设定：{scenario}
请提供：
1. 对话分析
2. 改进建议
3. 示范对话
4. 练习建议

[Language: English]
Based on chat history: {chatHistory}
Scenario: {scenario}
Please provide:
1. Dialogue analysis
2. Improvement suggestions
3. Example dialogue
4. Practice suggestions
`,

  // 情景模拟演练
  scenarioSimulation: `
[Language: Chinese]
请模拟以下情景：{scenario}
1. 情景分析
2. 应对策略
3. 对话示范
4. 注意事项

[Language: English]
Please simulate the following scenario: {scenario}
1. Scenario analysis
2. Response strategy
3. Dialogue demonstration
4. Precautions
`,

  // 沟通技巧指导
  communicationGuidance: `
[Language: Chinese]
请针对以下情况提供沟通指导：{context}
1. 沟通问题诊断
2. 技巧建议
3. 话术示例
4. 练习方法

[Language: English]
Please provide communication guidance for: {context}
1. Communication problem diagnosis
2. Technique suggestions
3. Speech examples
4. Practice methods
`,

  // AI情感陪伴
  emotionalCompanionship: `
[Language: Chinese]
请针对当前情绪状态：{state}
提供：
1. 情绪疏导
2. 心理支持
3. 行动建议
4. 温暖鼓励

[Language: English]
Based on current emotional state: {state}
Please provide:
1. Emotional guidance
2. Psychological support
3. Action suggestions
4. Warm encouragement
`,

  // 情感健康检测
  emotionalHealth: `
[Language: Chinese]
请分析以下情感健康状态：{description}
1. 情感健康指数评估
2. 依赖模式分析
3. 不安全依恋特征识别
4. 改善建议

[Language: English]
Please analyze the following emotional health status: {description}
1. Emotional health index assessment
2. Dependency pattern analysis
3. Insecure attachment traits identification
4. Improvement suggestions
`,

  // 单相思分析
  unrequitedLove: `
${commonPrompt}

[Language: Chinese]
请分析以下单相思/暗恋情况：
目标对象信息：{targetInfo}
当前状态：{currentStatus}
互动历史：{interactionHistory}
个人优势：{personalStrengths}
面临的挑战：{challenges}
期望：{expectations}

请从以下几个方面进行分析：
1. 现状评估
2. 优势分析
3. 挑战分析
4. 机会评估
5. 具体建议
6. 行动计划

[Language: English]
Please analyze the following unrequited love situation:
Target Info: {targetInfo}
Current Status: {currentStatus}
Interaction History: {interactionHistory}
Personal Strengths: {personalStrengths}
Challenges: {challenges}
Expectations: {expectations}

Please analyze from the following aspects:
1. Current Situation Assessment
2. Strength Analysis
3. Challenge Analysis
4. Opportunity Evaluation
5. Specific Suggestions
6. Action Plan
`,

  // 关系焦虑分析
  relationshipAnxiety: `
${commonPrompt}

[Language: Chinese]
请分析以下关系中的焦虑问题：
关系现状：{relationshipStatus}
焦虑触发点：{anxietyTriggers}
沟通模式：{communicationPatterns}
信任问题：{trustIssues}
个人历史：{personalHistory}
应对方法：{copingMethods}

请从以下几个方面进行分析：
1. 焦虑根源分析
2. 关系健康度评估
3. 沟通模式分析
4. 信任重建建议
5. 个人成长建议
6. 具体行动计划

[Language: English]
Please analyze the following relationship anxiety:
Relationship Status: {relationshipStatus}
Anxiety Triggers: {anxietyTriggers}
Communication Patterns: {communicationPatterns}
Trust Issues: {trustIssues}
Personal History: {personalHistory}
Coping Methods: {copingMethods}

Please analyze from the following aspects:
1. Root Cause Analysis
2. Relationship Health Assessment
3. Communication Pattern Analysis
4. Trust Rebuilding Suggestions
5. Personal Growth Recommendations
6. Specific Action Plan
`,

  // 分手挽回分析
  breakupRecovery: `
${commonPrompt}

[Language: Chinese]
请分析以下分手挽回情况：
分手原因：{breakupReason}
当前状况：{currentSituation}
联系状态：{contactStatus}
个人成长：{personalGrowth}
挽回尝试：{reconciliationAttempts}
未来计划：{futurePlans}

请从以下几个方面进行分析：
1. 分手原因分析
2. 挽回可能性评估
3. 当前状况分析
4. 个人成长建议
5. 挽回策略建议
6. 具体行动计划

[Language: English]
Please analyze the following breakup recovery situation:
Breakup Reason: {breakupReason}
Current Situation: {currentSituation}
Contact Status: {contactStatus}
Personal Growth: {personalGrowth}
Reconciliation Attempts: {reconciliationAttempts}
Future Plans: {futurePlans}

Please analyze from the following aspects:
1. Breakup Reason Analysis
2. Reconciliation Possibility Assessment
3. Current Situation Analysis
4. Personal Growth Recommendations
5. Reconciliation Strategy Suggestions
6. Specific Action Plan
`,

  // 情感修复分析
  emotionalHealing: `
${commonPrompt}

[Language: Chinese]
请分析以下情感修复情况：
情感创伤：{emotionalWounds}
信任问题：{trustIssues}
沟通问题：{communicationProblems}
个人成长：{personalGrowth}
关系目标：{relationshipGoals}
修复进展：{healingProgress}

请从以下几个方面进行分析：
1. 创伤根源分析
2. 信任重建建议
3. 沟通改善方案
4. 个人成长建议
5. 关系修复策略
6. 具体行动计划

[Language: English]
Please analyze the following emotional healing situation:
Emotional Wounds: {emotionalWounds}
Trust Issues: {trustIssues}
Communication Problems: {communicationProblems}
Personal Growth: {personalGrowth}
Relationship Goals: {relationshipGoals}
Healing Progress: {healingProgress}

Please analyze from the following aspects:
1. Trauma Root Cause Analysis
2. Trust Rebuilding Suggestions
3. Communication Improvement Plan
4. Personal Growth Recommendations
5. Relationship Repair Strategy
6. Specific Action Plan
`
};