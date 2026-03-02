# VideoCopyAI - 短视频文案智能生成工具

## 项目概述
一个基于AI的短视频文案生成工具，专门解决中小博主"选题废"问题。用户输入原文案，AI自动生成三种不同风格的爆款文案变体。

## 核心功能
1. **情绪反转版** - 制造情感波动，引发共鸣
2. **干货萃取版** - 提炼核心价值，提供实用方法  
3. **争议毒舌版** - 制造话题争议，引发讨论互动

## 技术栈
- **前端**: Next.js 14 + TypeScript + TailwindCSS
- **后端**: Next.js API Routes
- **AI集成**: DeepSeek API
- **部署**: Vercel (免费托管)
- **域名**: .cc 域名 (低成本)

## 项目结构
```
video-copy-ai/
├── app/
│   ├── api/
│   │   └── generate/          # AI文案生成API
│   ├── components/            # React组件
│   ├── page.tsx              # 主页面
│   ├── layout.tsx            # 布局
│   └── globals.css           # 全局样式
├── lib/
│   └── utils.ts              # 工具函数
├── public/                   # 静态资源
└── package.json
```

## 安装和运行

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装步骤
```bash
# 克隆项目
git clone <repository-url>
cd video-copy-ai

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 添加 DeepSeek API Key

# 启动开发服务器
npm run dev
```

### 环境变量配置
```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_API_URL=https://api.deepseek.com/v1
APP_NAME=VideoCopyAI
APP_DESCRIPTION=短视频文案智能生成工具
```

## 使用说明

### 免费用户
- 每日免费生成3次文案
- 支持三种文案变体
- 基础文案复制和下载功能

### 付费套餐
1. **基础版** (9.9元)
   - 50次生成机会
   - 保存历史记录
   - 导出功能

2. **无限版** (29元/月)
   - 无限次生成
   - 所有高级功能
   - 优先支持

3. **专业版** (99元/月)
   - 批量处理功能
   - 定制化模板
   - API接入权限

## 开发计划

### 第一阶段 (已完成)
- [x] 基础项目搭建
- [x] 核心AI集成
- [x] 三种文案变体生成
- [x] 免费次数限制系统
- [x] 基础UI设计

### 第二阶段 (进行中)
- [ ] 用户系统开发
- [ ] 付费功能集成
- [ ] 文案历史记录
- [ ] 分享功能

### 第三阶段 (计划中)
- [ ] 批量文案生成
- [ ] 多平台适配模板
- [ ] 数据分析面板
- [ ] 创作者社区

## 商业模式

### 收入来源
1. **付费套餐** - 主要收入来源
2. **企业API** - 为MCN机构提供API服务
3. **定制开发** - 为企业定制文案生成方案

### 成本结构
1. **域名费用** - .cc域名约25元/年
2. **API成本** - DeepSeek API调用费用
3. **服务器费用** - Vercel免费托管

### 盈利预测
- **第1个月**: 收回100元启动成本
- **第3个月**: 稳定月收入500-1000元
- **第6个月**: 月收入2000-5000元

## 技术特点

### 前端
- 响应式设计，支持移动端
- 蓝白色活泼风格
- 流畅的交互动画
- 本地存储管理使用次数

### 后端
- 安全的API密钥管理
- 请求频率限制
- 错误处理和日志记录
- 可扩展的API设计

### AI集成
- 优化的提示词工程
- 三种不同的文案风格
- 内容质量控制
- 成本优化策略

## 部署指南

### Vercel部署
1. 连接GitHub仓库到Vercel
2. 配置环境变量
3. 设置自定义域名
4. 启用自动部署

### 域名配置
1. 购买 .cc 域名
2. 配置DNS解析到Vercel
3. 在Vercel中添加自定义域名
4. 配置SSL证书

## 贡献指南
欢迎提交Issue和Pull Request！

## 许可证
MIT License

## 联系方式
- 邮箱: support@videocopy.ai
- GitHub: [项目地址]
- 微信: [待添加]