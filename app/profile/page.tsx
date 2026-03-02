'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, Mail, Crown, Coins, History, Settings, 
  LogOut, Edit2, Check, X, Sparkles, Zap, Star,
  ChevronRight, Package
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, updateUserInfo } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editNickname, setEditNickname] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setEditNickname(user.nickname);
    }
  }, [user]);

  // 未登录时跳转到登录页
  useEffect(() => {
    if (!isLoading && !isAuthenticated && mounted) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router, mounted]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSaveNickname = () => {
    if (editNickname.trim() && editNickname !== user.nickname) {
      updateUserInfo({ nickname: editNickname.trim() });
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getMembershipBadge = () => {
    switch (user.membership) {
      case 'pro':
        return { color: 'bg-purple-500', text: '专业版', icon: Star };
      case 'unlimited':
        return { color: 'bg-orange-500', text: '无限版', icon: Zap };
      case 'basic':
        return { color: 'bg-green-500', text: '基础版', icon: Package };
      default:
        return { color: 'bg-gray-400', text: '免费版', icon: Sparkles };
    }
  };

  const membershipBadge = getMembershipBadge();
  const MembershipIcon = membershipBadge.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">个人中心</h1>
          <p className="text-gray-600 mt-1">管理你的账号信息和套餐</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：用户信息卡片 */}
          <div className="space-y-6">
            {/* 头像和基本信息 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold">
                  {user.nickname.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editNickname}
                        onChange={(e) => setEditNickname(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        maxLength={20}
                      />
                      <button
                        onClick={handleSaveNickname}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setEditNickname(user.nickname);
                          setIsEditing(false);
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-gray-800">{user.nickname}</h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* 会员等级徽章 */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 ${membershipBadge.color} text-white rounded-full`}>
                <MembershipIcon className="w-4 h-4" />
                <span className="font-medium">{membershipBadge.text}</span>
              </div>

              {user.membershipExpiry && (
                <p className="text-sm text-gray-500 mt-2">
                  有效期至: {new Date(user.membershipExpiry).toLocaleDateString('zh-CN')}
                </p>
              )}
            </div>

            {/* 快速操作 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Link
                href="/pricing"
                className="flex items-center gap-3 px-6 py-4 hover:bg-blue-50 transition-colors border-b border-gray-100"
              >
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="flex-1 text-gray-700">升级套餐</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="text-red-600">退出登录</span>
              </button>
            </div>
          </div>

          {/* 右侧：统计数据和功能 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 使用统计 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Coins className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-600">剩余次数</span>
                </div>
                <p className="text-3xl font-bold text-gray-800">{user.remainingUses}</p>
                <p className="text-sm text-gray-500 mt-1">次生成机会</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <History className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-600">已使用</span>
                </div>
                <p className="text-3xl font-bold text-gray-800">{user.totalUsed}</p>
                <p className="text-sm text-gray-500 mt-1">次文案生成</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-gray-600">会员状态</span>
                </div>
                <p className="text-lg font-bold text-gray-800">{membershipBadge.text}</p>
                <Link href="/pricing" className="text-sm text-blue-600 hover:text-blue-700 mt-1 inline-block">
                  {user.membership === 'free' ? '立即升级 →' : '查看详情 →'}
                </Link>
              </div>
            </div>

            {/* 套餐信息 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">当前套餐</h3>
              
              {user.membership === 'free' ? (
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">免费版</h4>
                  <p className="text-gray-500 mb-4">每日3次免费生成机会</p>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-600 transition-all"
                  >
                    升级套餐
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${membershipBadge.color} rounded-xl`}>
                        <MembershipIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{membershipBadge.text}</h4>
                        <p className="text-sm text-gray-500">
                          有效期至 {new Date(user.membershipExpiry || '').toLocaleDateString('zh-CN')}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/pricing"
                      className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                    >
                      续费/升级
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-blue-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-800">{user.remainingUses}</p>
                      <p className="text-sm text-gray-500">剩余次数</p>
                    </div>
                    <div className="text-center border-x border-blue-200">
                      <p className="text-2xl font-bold text-gray-800">∞</p>
                      <p className="text-sm text-gray-500">历史记录</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-800">✓</p>
                      <p className="text-sm text-gray-500">导出功能</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 使用提示 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">💡 使用小贴士</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 每次生成消耗1次使用次数</li>
                    <li>• 免费用户每日0点自动重置为3次</li>
                    <li>• 付费套餐购买后立即生效</li>
                    <li>• 生成的文案可以无限制复制和使用</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
