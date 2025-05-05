import { PROMPTS } from '@/config/prompts';

export class OpenRouterService {
  private readonly baseUrl = import.meta.env.VITE_OPENROUTER_API_URL;
  private readonly apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  private readonly defaultModel = import.meta.env.VITE_OPENROUTER_DEFAULT_MODEL || 'anthropic/claude-3.7-sonnet';
  private readonly defaultImgModel = import.meta.env.VITE_OPENROUTER_DEFAULT_IMG_MODEL || 'google/gemini-2.5-pro-exp-03-25';
  private readonly defaultUnlimitedModel = import.meta.env.VITE_OPENROUTER_DEFAULT_UNLIMITED_MODEL || 'google/gemini-2.5-pro-exp-03-25';

  private async makeRequest(endpoint: string, body: any, stream = false): Promise<Response> {
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY is not set in environment variables');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://savemy.love',
        'X-Title': 'SaveMyLove',
      },
      body: JSON.stringify({
        ...body,
        stream: stream || false,
        model: this.defaultModel,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    return response;
  }

  private async handleStreamResponse(response: Response, onStream?: (chunk: string) => void): Promise<string> {
    if (!onStream) {
      const data = await response.json();
      return data.choices[0].message.content;
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Failed to get stream reader');

    let result = '';
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      console.log('Starting stream reading');
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('Stream reading completed');
          break;
        }

        const chunk = decoder.decode(value);
        buffer += chunk;

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              console.log('Received end marker');
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              if (content) {
                result += content;
                try {
                  // 添加错误处理和重试逻辑
                  let retries = 3;
                  let success = false;

                  while (retries > 0 && !success) {
                    try {
                      await onStream(content);
                      success = true;
                    } catch (streamError: unknown) {
                      console.error(`Stream write error (${retries} retries left):`, streamError);
                      retries--;
                      // 短暂延迟后重试
                      await new Promise(resolve => setTimeout(resolve, 100));

                      // 使用类型守卫检查错误类型
                      if (streamError && typeof streamError === 'object') {
                        const error = streamError as { message?: string; code?: string };
                        // 如果是客户端断开连接，则停止尝试
                        if (error.message?.includes('connection') ||
                          error.code === 'ERR_INVALID_STATE') {
                          console.log('Client appears to be disconnected, stopping stream');
                          throw new Error('Client disconnected');
                        }
                      }
                    }
                  }

                  if (!success) {
                    throw new Error('Failed to write to stream after multiple retries');
                  }
                } catch (streamError) {
                  // 如果是客户端断开连接，则优雅地结束流处理
                  if (streamError && typeof streamError === 'object') {
                    const error = streamError as { message?: string; code?: string };
                    if (error.message?.includes('disconnected') ||
                      error.code === 'ERR_INVALID_STATE') {
                      console.log('Gracefully handling client disconnection');
                      return result;  // Return result instead of throwing error
                    }
                  }
                  throw streamError;
                }
              }
            } catch (e) {
              console.error('Error parsing stream data:', e);
            }
          } else if (line.startsWith(': ')) {
            // 处理心跳消息
            continue;
          }
        }
      }
    } catch (error) {
      console.error('Stream processing error:', error);
      // 不要抛出错误，而是返回已处理的结果
      return result;
    } finally {
      reader.releaseLock();
    }

    return result;
  }

  public async analyzeWithAI(
    prompt: string,
    onStream?: (chunk: string) => void,
    model: string = this.defaultModel,
    imageUrl?: string
  ): Promise<string> {
    const messages = [
      {
        role: 'user',
        content: imageUrl
          ? [
            {
              type: 'text',
              text: prompt,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ]
          : prompt,
      },
    ];

    const response = await this.makeRequest('/chat/completions', {
      model,
      messages,
    }, !!onStream);

    return this.handleStreamResponse(response, onStream);
  }

  async getMonthlyCalendar(
    zodiacSign: string,
    birthDate: string,
    month: number,
    year: number,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    const prompt = PROMPTS.monthlyCalendar(zodiacSign, birthDate, month, year);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 姓名缘分测算
  async analyzeNameCompatibility(name1: string, name2: string, lang: '中文' | 'English', onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.nameCompatibility
      .replace('{name1}', name1)
      .replace('{name2}', name2)
      .replace(/{lang}/g, lang);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 星座匹配分析
  async analyzeZodiacMatch(sign1: string, sign2: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.zodiacMatch
      .replace('{sign1}', sign1)
      .replace('{sign2}', sign2);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 情感态度分析
  async analyzeEmotionalAttitude(description: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.emotionalAttitude.replace('{description}', description);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 关系健康度评估
  async analyzeRelationshipHealth(details: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.relationshipHealth.replace('{details}', details);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 聊天记录分析
  async analyzeChatHistory(chatHistory: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.chatAnalysis.replace('{chatHistory}', chatHistory);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 离开原因诊断
  async analyzeBreakupReason(situation: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.breakupAnalysis.replace('{situation}', situation);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 挽回可能性评估
  async analyzeReconciliationPossibility(details: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.reconciliationAnalysis.replace('{details}', details);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 情感修复指南生成
  async generateRepairGuide(situation: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.repairGuide.replace('{situation}', situation);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 个性化追回计划
  async generateRecoveryPlan(details: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.recoveryPlan.replace('{details}', details);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 情感日记分析
  async analyzeEmotionalDiary(diary: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.diaryAnalysis.replace('{diary}', diary);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 情绪追踪分析
  async analyzeEmotionalTrend(emotions: string[], dates: string[], onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.emotionalTrend
      .replace('{emotions}', JSON.stringify(emotions))
      .replace('{dates}', JSON.stringify(dates));
    return this.analyzeWithAI(prompt, onStream);
  }

  // 治愈内容推荐
  async getHealingContent(emotionalState: string, preferences: string[], onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.healingContent
      .replace('{emotionalState}', emotionalState)
      .replace('{preferences}', JSON.stringify(preferences));
    return this.analyzeWithAI(prompt, onStream);
  }

  // 缘分指数计算
  async calculateAffinityScore(details: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.affinityScore.replace('{details}', details);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 个性化追求攻略生成
  async generatePursuitStrategy(details: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.pursuitStrategy.replace('{details}', details);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 个性化挽留策略
  async generateRetentionStrategy(details: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.retentionStrategy.replace('{details}', details);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 现状综合评估
  async analyzeSituation(details: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.situationAnalysis.replace('{details}', details);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 阶段性目标设定
  async setPhaseGoals(details: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.phaseGoals.replace('{details}', details);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 进度追踪系统
  async trackProgress(details: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.progressTracking.replace('{details}', details);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 基于真实聊天记录的对话训练
  async trainDialogue(chatHistory: string, scenario: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.dialogueTraining
      .replace('{chatHistory}', chatHistory)
      .replace('{scenario}', scenario);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 情景模拟演练
  async simulateScenario(scenario: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.scenarioSimulation.replace('{scenario}', scenario);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 沟通技巧指导
  async provideCommunicationGuidance(context: string, onStream?: (chunk: string) => void, language?: string): Promise<string> {
    let langTag = '';
    if (language === 'zh') langTag = '[Language: Chinese]\n';
    else if (language === 'en') langTag = '[Language: English]\n';
    const prompt = langTag + PROMPTS.communicationGuidance.replace('{context}', context);
    return this.analyzeWithAI(prompt, onStream);
  }

  // AI情感陪伴
  async provideEmotionalCompanionship(state: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.emotionalCompanionship.replace('{state}', state);
    return this.analyzeWithAI(prompt, onStream);
  }

  // 情感健康检测
  async analyzeEmotionalHealth(description: string, onStream?: (chunk: string) => void): Promise<string> {
    const prompt = PROMPTS.emotionalHealth.replace('{description}', description);
    return this.analyzeWithAI(prompt, onStream);
  }

  async analyzeZodiacCompatibility(
    zodiac1: string,
    birthDate1: string,
    zodiac2: string,
    birthDate2: string,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    const prompt = `请分析以下两个人的星座匹配情况：
第一个人：${zodiac1}，出生日期：${birthDate1}
第二个人：${zodiac2}，出生日期：${birthDate2}

请从以下几个方面进行详细分析：
1. 星座基本特质
2. 元素相性（金木水火土）
3. 性格互补性
4. 沟通方式
5. 共同价值观
6. 感情相处模式
7. 潜在问题和建议
8. 匹配评分表（包含以下维度）：
   - 性格契合度
   - 沟通默契度
   - 价值观一致性
   - 感情稳定性
   - 发展潜力
   - 综合评分

请用markdown格式输出，确保表格格式正确。对每个方面都要给出详细的分析和具体的建议。`;

    return this.analyzeWithAI(prompt, onStream);
  }

  async analyzePursuitStrategy(
    targetPersonality: string,
    relationshipStatus: string,
    interactionFrequency: string,
    commonInterests: string,
    challenges: string,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    const prompt = `请根据以下信息，为追求者制定个性化的追求策略：

目标对象性格特点：
${targetPersonality}

当前关系状态：
${relationshipStatus}

互动频率：
${interactionFrequency}

共同兴趣：
${commonInterests}

面临的挑战：
${challenges}

请从以下几个方面提供详细的追求策略：
1. 性格匹配分析
2. 互动频率建议
3. 共同兴趣开发
4. 沟通方式优化
5. 情感表达技巧
6. 潜在问题应对
7. 具体行动建议
8. 时间规划建议

请用markdown格式输出，确保内容结构清晰，建议具体可行。`;

    return this.analyzeWithAI(prompt, onStream);
  }

  async assessReconciliation(
    breakupReason: string,
    breakupTime: string,
    currentContact: string,
    mutualFriends: string,
    pastIssues: string,
    changesMade: string,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    const prompt = `请评估以下分手情况的挽回可能性：

分手原因：
${breakupReason}

分手时间：
${breakupTime}

当前联系状态：
${currentContact}

共同朋友情况：
${mutualFriends}

过去的问题：
${pastIssues}

已做出的改变：
${changesMade}

请从以下几个方面进行评估：
1. 分手原因分析
   - 根本原因
   - 可解决性
   - 影响程度

2. 挽回可能性评估
   - 时间因素
   - 情感基础
   - 现实条件

3. 当前状态分析
   - 联系质量
   - 情感状态
   - 外部支持

4. 挽回策略建议
   - 短期行动
   - 长期改变
   - 沟通方式

5. 风险评估
   - 潜在障碍
   - 可能后果
   - 应对方案

6. 综合评分
   - 挽回可能性
   - 关系质量
   - 发展潜力

请用markdown格式输出，确保评估全面，建议具体可行。`;

    return this.analyzeWithAI(prompt, onStream);
  }

  async assessEmotionalHealth(
    relationshipPatterns: string,
    emotionalTriggers: string,
    attachmentStyle: string,
    selfEsteem: string,
    communicationStyle: string,
    copingMechanisms: string,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    const prompt = `请评估以下情感健康状态：

关系模式：
${relationshipPatterns}

情感触发点：
${emotionalTriggers}

依恋风格：
${attachmentStyle}

自尊水平：
${selfEsteem}

沟通方式：
${communicationStyle}

应对机制：
${copingMechanisms}

请从以下几个方面进行评估：
1. 依恋模式分析
   - 依恋类型
   - 形成原因
   - 影响表现

2. 情感健康评估
   - 情绪管理
   - 自我认知
   - 关系能力

3. 潜在问题识别
   - 不健康模式
   - 情感障碍
   - 关系困扰

4. 改进建议
   - 自我提升
   - 关系改善
   - 情感管理

5. 具体行动方案
   - 短期目标
   - 长期规划
   - 支持资源

6. 健康指标评分
   - 情感稳定性
   - 关系满意度
   - 个人成长

请用markdown格式输出，确保评估全面，建议具体可行。`;

    return this.analyzeWithAI(prompt, onStream);
  }

  async analyzeUnrequitedLove(
    targetInfo: string,
    currentStatus: string,
    interactionHistory: string,
    personalStrengths: string,
    challenges: string,
    expectations: string,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    const prompt = PROMPTS.unrequitedLove
      .replace('{targetInfo}', targetInfo)
      .replace('{currentStatus}', currentStatus)
      .replace('{interactionHistory}', interactionHistory)
      .replace('{personalStrengths}', personalStrengths)
      .replace('{challenges}', challenges)
      .replace('{expectations}', expectations);
    return this.analyzeWithAI(prompt, onStream);
  }

  async analyzeRelationshipAnxiety(
    relationshipStatus: string,
    anxietyTriggers: string,
    communicationPatterns: string,
    trustIssues: string,
    personalHistory: string,
    copingMethods: string,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    const prompt = PROMPTS.relationshipAnxiety
      .replace('{relationshipStatus}', relationshipStatus)
      .replace('{anxietyTriggers}', anxietyTriggers)
      .replace('{communicationPatterns}', communicationPatterns)
      .replace('{trustIssues}', trustIssues)
      .replace('{personalHistory}', personalHistory)
      .replace('{copingMethods}', copingMethods);
    return this.analyzeWithAI(prompt, onStream);
  }

  async analyzeBreakupRecovery(
    breakupReason: string,
    currentSituation: string,
    contactStatus: string,
    personalGrowth: string,
    reconciliationAttempts: string,
    futurePlans: string,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    const prompt = PROMPTS.breakupRecovery
      .replace('{breakupReason}', breakupReason)
      .replace('{currentSituation}', currentSituation)
      .replace('{contactStatus}', contactStatus)
      .replace('{personalGrowth}', personalGrowth)
      .replace('{reconciliationAttempts}', reconciliationAttempts)
      .replace('{futurePlans}', futurePlans);
    return this.analyzeWithAI(prompt, onStream);
  }

  async analyzeEmotionalHealing(
    emotionalWounds: string,
    trustIssues: string,
    communicationProblems: string,
    personalGrowth: string,
    relationshipGoals: string,
    healingProgress: string,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    const prompt = PROMPTS.emotionalHealing
      .replace('{emotionalWounds}', emotionalWounds)
      .replace('{trustIssues}', trustIssues)
      .replace('{communicationProblems}', communicationProblems)
      .replace('{personalGrowth}', personalGrowth)
      .replace('{relationshipGoals}', relationshipGoals)
      .replace('{healingProgress}', healingProgress);
    return this.analyzeWithAI(prompt, onStream);
  }
}

const openrouterService = new OpenRouterService();
export default openrouterService;