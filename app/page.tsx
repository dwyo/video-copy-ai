'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Zap, Brain, MessageSquare, Copy, RefreshCw, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/contexts/UserContext';

export default function Home() {
  const { user, isAuthenticated, useOneGeneration } = useUser();
  const [inputText, setInputText] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<'emotional' | 'practical' | 'controversial'>('emotional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);
  
  // 使用用户的剩余次数，未登录默认为3
  const freeUsesLeft = isAuthenticated && user ? user.remainingUses : 3;

  const variants = [
    {
      id: 'emotional',
      name: '情绪反转版',
      description: '制造悬念，情感转折，引发共鸣',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'practical',
      name: '干货萃取版',
      description: '提取核心，结构清晰，实用性强',
      icon: Brain,
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 'controversial',
      name: '争议毒舌版',
      description: '观点鲜明，语言犀利，引发讨论',
      icon: Zap,
      color: 'from-orange-500 to-red-400'
    }
  ];

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      alert('请输入文案内容');
      return;
    }

    if (freeUsesLeft <= 0) {
      alert('今日免费次数已用完，请升级套餐或明日再来');
      return;
    }

    setIsGenerating(true);
    setGeneratedText('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          variant: selectedVariant,
          sessionId: 'demo-session' // 后续可改为真实会话ID
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedText(data.text);
        // 如果已登录，使用用户系统的次数
        if (isAuthenticated && user) {
          useOneGeneration();
        }
      } else {
        alert(data.error || '生成失败，请重试');
      }
    } catch (error) {
      console.error('生成失败:', error);
      alert('网络错误，请检查连接后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setInputText('');
    setGeneratedText('');
  };

  const handleExample = () => {
    setInputText('今天给大家分享一个快速学习新技能的方法，只需要每天坚持30分钟，一个月后你就能看到明显进步。关键是找到适合自己的学习节奏，不要急于求成。');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 英雄区域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            短视频文案
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              智能生成器
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            一键解决"选题废"问题，为中小博主提供情绪反转、干货萃取、争议毒舌三种爆款文案变体
          </p>
          
          {/* 免费次数提示 */}
          <div className="mt-6 inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              今日剩余免费次数: <span className="text-blue-600 font-bold">{freeUsesLeft}</span> 次
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：输入区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 文案输入 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  输入原文案
                </h2>
                <button
                  onClick={handleExample}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  使用示例文案
                </button>
              </div>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="粘贴你的抖音/TikTok文案，或直接输入想改编的文案内容..."
                className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                maxLength={1000}
              />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {inputText.length}/1000 字符
                </span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  <RefreshCw className="w-4 h-4" />
                  清空
                </button>
              </div>
            </div>

            {/* 生成结果 */}
            {generatedText && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    生成结果
                  </h2>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        复制文案
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {generatedText}
                  </p>
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                  💡 提示：复制文案后可直接用于短视频创作，建议根据实际场景微调
                </div>
              </div>
            )}
          </div>

          {/* 右侧：控制面板 */}
          <div className="space-y-6">
            {/* 变体选择 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                选择文案变体
              </h2>
              
              <div className="space-y-4">
                {variants.map((variant) => {
                  const Icon = variant.icon;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id as any)}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        selectedVariant === variant.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${variant.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-800">
                            {variant.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {variant.description}
                          </p>
                        </div>
                        {selectedVariant === variant.id && (
                          <div className="ml-auto">
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 生成按钮 */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || freeUsesLeft <= 0}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                isGenerating || freeUsesLeft <= 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  正在生成中...
                </div>
              ) : freeUsesLeft <= 0 ? (
                '今日免费次数已用完'
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  立即生成文案
                </div>
              )}
            </button>

            {/* 使用说明 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                使用说明
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </div>
                  输入或粘贴你的原文案
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </div>
                  选择想要的文案变体风格
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </div>
                  点击生成，AI将为你创作新文案
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    4
                  </div>
                  复制结果，用于你的短视频创作
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}