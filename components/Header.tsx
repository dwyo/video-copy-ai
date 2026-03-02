'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, User, Menu, X, ChevronDown, Crown, LogOut, Settings, CreditCard } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useUser();

  const navItems = [
    { label: '首页', href: '/' },
    { label: '功能特色', href: '/#features' },
    { label: '价格方案', href: '/pricing' },
  ];

  const getMembershipColor = () => {
    switch (user?.membership) {
      case 'pro': return 'bg-purple-500';
      case 'unlimited': return 'bg-orange-500';
      case 'basic': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                VideoCopy<span className="text-blue-600">AI</span>
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">短视频文案智能生成</p>
            </div>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 用户操作 */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              // 已登录状态
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full ${getMembershipColor()} flex items-center justify-center text-white font-bold`}>
                    {user.nickname.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user.nickname}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* 下拉菜单 */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                    {/* 用户信息 */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-800 truncate">{user.nickname}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white ${getMembershipColor()}`}>
                          <Crown className="w-3 h-3" />
                          {user.membership === 'free' ? '免费版' : 
                           user.membership === 'basic' ? '基础版' :
                           user.membership === 'unlimited' ? '无限版' : '专业版'}
                        </span>
                        <span className="text-xs text-gray-500">
                          剩余 {user.remainingUses} 次
                        </span>
                      </div>
                    </div>

                    {/* 菜单项 */}
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      个人中心
                    </Link>
                    <Link
                      href="/pricing"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <CreditCard className="w-4 h-4" />
                      充值升级
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // 未登录状态
              <>
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <User className="w-4 h-4" />
                  登录
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg text-sm"
                >
                  免费注册
                </Link>
              </>
            )}

            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    个人中心
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-600 font-medium py-2 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    退出登录
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    登录
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    免费注册
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
