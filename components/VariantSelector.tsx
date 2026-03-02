import React from 'react';
import { cn } from '@/lib/utils';

interface VariantSelectorProps {
  selectedVariant: 'emotional' | 'practical' | 'controversial';
  onSelect: (variant: 'emotional' | 'practical' | 'controversial') => void;
}

const variants = [
  {
    id: 'emotional' as const,
    name: '情绪反转版',
    description: '制造情感波动，引发共鸣',
    icon: '😭',
    color: 'from-blue-400 to-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'practical' as const,
    name: '干货萃取版',
    description: '提炼核心，提供方法',
    icon: '📚',
    color: 'from-green-400 to-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 'controversial' as const,
    name: '争议毒舌版',
    description: '制造话题，引发讨论',
    icon: '🔥',
    color: 'from-purple-400 to-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  }
];

const VariantSelector: React.FC<VariantSelectorProps> = ({ selectedVariant, onSelect }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        选择文案变体
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            className={cn(
              'p-4 rounded-lg border-2 transition-all text-left',
              variant.bgColor,
              variant.borderColor,
              selectedVariant === variant.id
                ? 'ring-2 ring-offset-2 ring-opacity-50 transform scale-[1.02]'
                : 'hover:scale-[1.01] hover:shadow-sm'
            )}
            style={{
              ringColor: selectedVariant === variant.id 
                ? variant.color.split(' ')[0].replace('from-', '') 
                : 'transparent'
            }}
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${variant.color} flex items-center justify-center text-white text-2xl`}>
                {variant.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{variant.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{variant.description}</p>
              </div>
            </div>
            
            {selectedVariant === variant.id && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  {variant.id === 'emotional' && '• 开头情绪钩子 • 中间情感转折 • 结尾价值升华'}
                  {variant.id === 'practical' && '• 直接点明价值 • 分步骤讲解 • 具体可操作'}
                  {variant.id === 'controversial' && '• 挑衅性观点 • 犀利剖析 • 引发思考'}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;