import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// 三种文案变体的提示词模板
const PROMPT_TEMPLATES = {
  emotional: `你是一个短视频文案专家。请将以下文案改编成"情绪反转版"：
  要求：
  1. 开头制造悬念或冲突
  2. 中间有情感转折
  3. 结尾有共鸣或启发
  4. 适合短视频节奏，有画面感
  5. 长度在100-150字之间

  原文案：{text}

  请生成情绪反转版的文案：`,

  practical: `你是一个短视频文案专家。请将以下文案改编成"干货萃取版"：
  要求：
  1. 提取核心知识点或技巧
  2. 结构清晰，分点说明
  3. 实用性强，可立即应用
  4. 适合教育类短视频
  5. 长度在100-150字之间

  原文案：{text}

  请生成干货萃取版的文案：`,

  controversial: `你是一个短视频文案专家。请将以下文案改编成"争议毒舌版"：
  要求：
  1. 观点鲜明，有争议性
  2. 语言犀利，有记忆点
  3. 引发讨论和互动
  4. 适合话题性短视频
  5. 长度在100-150字之间

  原文案：{text}

  请生成争议毒舌版的文案：`
};

export async function POST(request: NextRequest) {
  try {
    const { text, variant, sessionId } = await request.json();

    // 输入验证
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: '请输入文案内容' },
        { status: 400 }
      );
    }

    if (!variant || !['emotional', 'practical', 'controversial'].includes(variant)) {
      return NextResponse.json(
        { error: '请选择有效的文案变体类型' },
        { status: 400 }
      );
    }

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: 'API配置错误' },
        { status: 500 }
      );
    }

    // 构建提示词
    const prompt = PROMPT_TEMPLATES[variant as keyof typeof PROMPT_TEMPLATES]
      .replace('{text}', text);

    // 调用DeepSeek API
    const response = await fetch(`${DEEPSEEK_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短视频文案创作助手，擅长生成各种风格的短视频文案。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API error:', errorData);
      return NextResponse.json(
        { error: 'AI生成失败，请稍后重试' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedText = data.choices[0]?.message?.content || '生成失败，请重试。';

    // 记录使用情况（简化版，后续可接入数据库）
    console.log(`文案生成记录 - 变体: ${variant}, 会话: ${sessionId || 'anonymous'}`);

    return NextResponse.json({
      success: true,
      text: generatedText,
      variant,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('生成文案时出错:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}