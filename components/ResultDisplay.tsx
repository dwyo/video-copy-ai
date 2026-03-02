import React from 'react';
import { cn } from '@/lib/utils';

interface ResultDisplayProps {
  result: string | null;
  variant: 'emotional' | 'practical' | 'controversial';
  isGenerating: boolean;
}

const variantConfig = {
  emotional: {
    title: '情绪反转版',
    icon: '😭',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  practical: {
    title: '干货萃取版',
    icon: '📚',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  controversial: {
    title: '争议毒舌版',
    icon: '🔥',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  }
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, variant, isGenerating }) => {
  const config = variantConfig[variant];

  const handleCopy = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      alert('文案已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `文案_${config.title}_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn(
      'sticky top-24 h-fit rounded-xl border-2 p-6 transition-all',
      config.bgColor,
      config.borderColor,
      result ? 'shadow-lg' : 'shadow-sm'
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('text-2xl', config.color)}>
            {config.icon}
          </div>
          <div>
            <h3 className={cn('font-bold text-lg', config.color)}>
              {config.title}
            </h3>
            <p className="text-sm text-gray-500">
              {isGenerating ? '正在生成...' : result ? '生成完成' : '等待生成'}
            </p>
          </div>
        </div>
        
        {result && (
          <div className="text-sm text-gray-500">
            {result.length} 字
          </div>
        )}
      </div>

      {isGenerating ? (
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-full animate-pulse w-3/4"></div>
          <div className="flex justify-center mt-6">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : result ? (
        <>
          <div className="mb-6">
            <div className={cn(
              'p-4 rounded-lg border',
              config.bgColor.replace('50', '100'),
              config.borderColor
            )}>
              <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                {result}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCopy}
              className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <span>📋</span>
              复制文案
            </button>
            
            <button
              onClick={handleDownload}
              className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <span>⬇️</span>
              下载文案
            </button>

            <div className="text-xs text-gray-500 text-center pt-2">
              💡 提示：复制后可直接用于短视频创作
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4 text-gray-300">📝</div>
          <p className="text-gray-500">
            生成结果将显示在这里
          </p>
          <p className="text-sm text-gray-400 mt-2">
            选择变体并点击生成按钮
          </p>
        </div>
      )}

      {/* 使用建议 */}
      {result && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-700 mb-2">🎯 使用建议</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {variant === 'emotional' && (
              <>
                <li>• 配合情感音乐效果更佳</li>
                <li>• 注意语气和表情的配合</li>
                <li>• 结尾可以加入个人故事</li>
              </>
            )}
            {variant === 'practical' && (
              <>
                <li>• 可以制作成分步教程视频</li>
                <li>• 添加屏幕录制或演示</li>
                <li>• 强调"看完就能用"</li>
              </>
            )}
            {variant === 'controversial' && (
              <>
                <li>• 注意语气要坚定但不攻击</li>
                <li>• 可以@相关账号引发讨论</li>
                <li>• 在评论区引导话题</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;