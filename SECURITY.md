# 安全指南

## ⚠️ 重要提醒

**永远不要将以下文件提交到 Git 仓库：**

- `.env.local` - 包含真实的 API 密钥
- `.env.production` - 生产环境配置
- 任何包含真实密钥的配置文件

## 🔐 环境变量管理

### 开发环境
1. 复制 `.env.example` 为 `.env.local`
   ```bash
   cp .env.example .env.local
   ```

2. 编辑 `.env.local`，填入真实的 API 密钥
   ```bash
   DEEPSEEK_API_KEY=sk-your-real-api-key-here
   ```

3. 确认 `.env.local` 未被 Git 跟踪
   ```bash
   git status
   # 应该不显示 .env.local
   ```

### 生产环境 (Vercel)
在 Vercel Dashboard 中设置环境变量：
1. 进入项目 → Settings → Environment Variables
2. 添加 `DEEPSEEK_API_KEY` 和其他必要变量
3. 重新部署以应用新变量

## 🛡️ 安全检查清单

- [ ] `.env.local` 在 `.gitignore` 中
- [ ] API 密钥未硬编码在任何代码文件中
- [ ] 生产环境密钥与开发环境不同
- [ ] 定期轮换 API 密钥
- [ ] 限制 API 密钥的 IP 访问范围（如支持）

## 🚨 如果意外提交了密钥

1. **立即撤销密钥**
   - 登录 DeepSeek 平台
   - 删除或禁用已泄露的 API Key
   - 生成新的 API Key

2. **清理 Git 历史**
   ```bash
   # 从整个历史中移除文件
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch .env.local' \
   --prune-empty --tag-name-filter cat -- --all
   
   # 强制推送
   git push origin --force --all
   ```

3. **更新所有环境**
   - 本地：更新 `.env.local`
   - 生产：更新 Vercel 环境变量

## 📞 联系方式

如果发现安全问题，请立即联系项目维护者。
