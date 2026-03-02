import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder }) => {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (err) {
      console.error('粘贴失败:', err);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          输入文案
        </label>
        <div className="text-sm text-gray-500">
          {value.length}/1000 字
        </div>
      </div>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "输入你的文案..."}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
          maxLength={1000}
        />
        
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            type="button"
            onClick={handlePaste}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            粘贴
          </button>
          <button
            type="button"
            onClick={() => onChange('')}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            清空
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        💡 提示：可以粘贴抖音、小红书、B站等平台的文案，或直接输入你的灵感想法
      </div>
    </div>
  );
};

export default TextInput;