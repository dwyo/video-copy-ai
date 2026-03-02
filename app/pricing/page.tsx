'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, Check, Zap, Star, Package, Crown,
  ChevronLeft, Loader2, CreditCard
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  icon: React.ElementType;
  color: string;
  popular?: boolean;
  features: string[];
  amount: number;
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: '基础版',
    price: 9.9,
    unit: '元',
    description: '适合偶尔使用的创作者',
    icon: Package,
    color: 'from-green-500 to-emerald-400',
    features: [
      '50次文案生成',
      '三种文案变体',
      '保存历史记录',
      '导出功能',
      '7天有效期',
    ],
    amount: 50,
  },
  {
    id: 'unlimited',
    name: '无限版',
    price: 29,
    unit: '元/月',
    description: '最适合活跃的短视频创作者',
    icon: Zap,
    color: 'from-orange-500 to-red-400',
    popular: true,
    features: [
      '无限次文案生成',
      '三种文案变体',
      '永久历史记录',
      '批量导出功能',
      '优先客服支持',
      '30天有效期',
    ],
    amount: 999999,
  },
  {
    id: 'pro',
    name: '专业版',
    price: 99,
    unit: '元/月',
    description: '为专业团队和MCN机构打造',
    icon: Star,
    color: 'from-purple-500 to-pink-400',
    features: [
      '无限次文案生成',
      '批量处理功能',
      '定制化模板',
      'API接入权限',
      '专属客服支持',
      '数据分析报告',
      '30天有效期',
    ],
    amount: 999999,
  },
];

export default function PricingPage() {
  const router = useRouter();
  const { user, isAuthenticated, addGenerationUses } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/pricing');
      return;
    }
    setSelectedPlan(planId);
  };

  const handlePayment = async () => {
    if (!selectedPlan || !user) return;

    setIsProcessing(true);

    // 模拟支付过程
    await new Promise(resolve => setTimeout(resolve, 2000));

    const plan = plans.find(p => p.id === selectedPlan);
    if (plan) {
      addGenerationUses(plan.amount, plan.id as any);
      setIsProcessing(false);
      setShowSuccess(true);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedPlan(null);
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* 成功弹窗 */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">充值成功！</h3>
            <p className="text-gray-600 mb-6">
              你的套餐已升级，现在可以畅享更多文案生成次数了！
            </p>
            <button
              onClick={handleCloseSuccess}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all"
            >
              查看我的账户
            </button>
          </div>
        </div>
      )}

      {/* 支付确认弹窗 */}
      {selectedPlan && !showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">确认订单</h3>
            {(() => {
              const plan = plans.find(p => p.id === selectedPlan);
              if (!plan) return null;
              const PlanIcon = plan.icon;
              return (
                <>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${plan.color}`}>
                      <PlanIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{plan.name}</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        ¥{plan.price}<span className="text-sm text-gray-500">{plan.unit}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">支付方式：模拟支付（演示用）</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      注：这是演示环境，点击确认后将直接完成充值
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedPlan(null)}
                      className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                      disabled={isProcessing}
                    >
                      取消
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          处理中...
                        </div>
                      ) : (
                        '确认支付'
                      )}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 返回按钮 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          返回首页
        </Link>

        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            选择适合你的
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              套餐方案
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            无论你是偶尔创作的爱好者，还是专业的内容团队，我们都有适合你的方案
          </p>
        </div>

        {/* 当前状态提示 */}
        {isAuthenticated && user && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">
                    当前套餐：{user.membership === 'free' ? '免费版' : 
                              user.membership === 'basic' ? '基础版' :
                              user.membership === 'unlimited' ? '无限版' : '专业版'}
                  </p>
                  <p className="text-sm text-gray-600">
                    剩余 {user.remainingUses} 次生成机会
                  </p>
                </div>
              </div>
              <Link
                href="/profile"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                查看详情 →
              </Link>
            </div>
          </div>
        )}

        {/* 价格卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = user?.membership === plan.id;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                  plan.popular ? 'ring-2 ring-orange-400 scale-105 md:scale-110' : ''
                }`}
              >
                {/* 热门标签 */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-400 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                    最受欢迎
                  </div>
                )}

                {/* 当前套餐标签 */}
                {isCurrentPlan && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-br-xl">
                    当前套餐
                  </div>
                )}

                <div className="p-8">
                  {/* 图标和名称 */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${plan.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                  </div>

                  {/* 价格 */}
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-800">¥{plan.price}</span>
                    <span className="text-gray-500">{plan.unit}</span>
                  </div>

                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* 功能列表 */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.popular ? 'text-orange-500' : 'text-blue-500'
                        }`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 按钮 */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      isCurrentPlan
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-red-400 text-white hover:from-orange-600 hover:to-red-500 shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600'
                    }`}
                  >
                    {isCurrentPlan ? '当前套餐' : '立即购买'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 免费版提示 */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="bg-gray-50 rounded-2xl p-6">
            <Sparkles className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">免费版</h3>
            <p className="text-gray-600 mb-4">
              每日3次免费生成机会，适合体验和小规模使用
            </p>
            {!isAuthenticated && (
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                免费注册开始使用
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Link>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">常见问题</h2>
          <div className="space-y-4">
            {[
              {
                q: '购买后可以退款吗？',
                a: '由于虚拟产品的特殊性，购买后不支持退款。建议先使用免费版体验功能。',
              },
              {
                q: '套餐到期后会怎样？',
                a: '套餐到期后，你将回到免费版状态，每日有3次免费生成机会。之前的历史记录会保留。',
              },
              {
                q: '可以切换套餐吗？',
                a: '可以。购买新套餐会立即生效，原有未用完的次数会累加。',
              },
              {
                q: '如何联系客服？',
                a: '付费用户可以通过个人中心的客服入口获得优先支持，我们会尽快回复。',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">{item.q}</h4>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
