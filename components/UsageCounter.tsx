import React from 'react';

interface UsageCounterProps {
  usageCount: number;
  remainingUses: number;
}

const UsageCounter: React.FC<UsageCounterProps> = ({ usageCount, remainingUses }) => {
  const totalUses = 3; // 每日免费次数
  
  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600">🎯</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">今日使用情况</h3>
            <p className="text-sm text-gray-500">每日免费 {totalUses} 次</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {remainingUses}
          </div>
          <div className="text-sm text-gray-500">剩余次数</div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>已用 {usageCount} 次</span>
          <span>剩余 {remainingUses} 次</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(usageCount / totalUses) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 提示信息 */}
      {remainingUses === 0 ? (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">⚠️</span>
            <div>
              <p className="text-sm font-medium text-yellow-800">
                今日免费次数已用完
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                升级套餐获得无限次生成，或明天再来
              </p>
            </div>
          </div>
          <button className="w-full mt-3 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all">
            立即升级
          </button>
        </div>
      ) : remainingUses <= 1 ? (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">💡</span>
            <p className="text-sm text-blue-700">
              还剩 {remainingUses} 次免费机会，珍惜使用哦！
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✨</span>
            <p className="text-sm text-green-700">
              还有 {remainingUses} 次免费机会，尽情创作吧！
            </p>
          </div>
        </div>
      )}

      {/* 套餐信息 */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">升级套餐</p>
            <p className="text-xs text-gray-500">获得更多生成次数</p>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
            查看套餐
          </button>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="text-center p-2 bg-white border border-gray-200 rounded-lg">
            <div className="text-xs text-gray-500">基础版</div>
            <div className="font-bold text-gray-800">9.9元</div>
            <div className="text-xs text-gray-500">50次</div>
          </div>
          <div className="text-center p-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
            <div className="text-xs text-blue-600">无限版</div>
            <div className="font-bold text-blue-700">29元/月</div>
            <div className="text-xs text-blue-500">无限次</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageCounter;