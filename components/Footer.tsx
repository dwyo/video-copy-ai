import { Heart, Github, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  VideoCopy<span className="text-blue-600">AI</span>
                </h2>
                <p className="text-sm text-gray-500">让创作更简单</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              专注于为短视频创作者提供智能文案生成服务，解决"选题废"难题，提升创作效率。
            </p>
          </div>

          {/* 产品功能 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">产品功能</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  情绪反转文案
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  干货萃取文案
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  争议毒舌文案
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  批量文案生成
                </a>
              </li>
            </ul>
          </div>

          {/* 资源链接 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">资源链接</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  使用教程
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  常见问题
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  更新日志
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  开发者API
                </a>
              </li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">联系我们</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="mailto:support@videocopy.ai" className="hover:text-blue-600 transition-colors">
                  support@videocopy.ai
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  商务合作
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  意见反馈
                </a>
              </li>
            </ul>
            
            {/* 社交媒体 */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="微信"
              >
                <MessageCircle className="w-5 h-5 text-gray-700" />
              </a>
            </div>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>
              © {currentYear} VideoCopyAI. 保留所有权利。
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-700 transition-colors">
                隐私政策
              </a>
              <a href="#" className="hover:text-gray-700 transition-colors">
                服务条款
              </a>
              <a href="#" className="hover:text-gray-700 transition-colors">
                Cookie政策
              </a>
            </div>
          </div>
          
          {/* 爱心提示 */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            用心打造每一行代码，为创作者赋能
          </div>
        </div>
      </div>
    </footer>
  );
}