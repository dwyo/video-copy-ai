// 用户认证工具函数

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar?: string;
  membership: 'free' | 'basic' | 'unlimited' | 'pro';
  remainingUses: number;
  totalUsed: number;
  membershipExpiry?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const AUTH_KEY = 'videocopyai_auth';
const USERS_KEY = 'videocopyai_users';

// 生成唯一ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// 模拟JWT token
function generateToken(userId: string): string {
  return `token_${userId}_${Date.now()}`;
}

// 获取存储的用户列表
function getUsers(): Record<string, { email: string; password: string; user: User }> {
  if (typeof window === 'undefined') return {};
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
}

// 保存用户列表
function saveUsers(users: Record<string, { email: string; password: string; user: User }>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// 注册
export function register(email: string, password: string, nickname: string): { success: boolean; message: string; user?: User } {
  const users = getUsers();
  
  // 检查邮箱是否已存在
  const existingUser = Object.values(users).find(u => u.email === email);
  if (existingUser) {
    return { success: false, message: '该邮箱已被注册' };
  }

  // 创建新用户
  const userId = generateId();
  const newUser: User = {
    id: userId,
    email,
    nickname,
    membership: 'free',
    remainingUses: 3, // 每日免费3次
    totalUsed: 0,
  };

  users[userId] = { email, password, user: newUser };
  saveUsers(users);

  return { success: true, message: '注册成功', user: newUser };
}

// 登录
export function login(email: string, password: string): { success: boolean; message: string; user?: User; token?: string } {
  const users = getUsers();
  
  // 查找用户
  const userEntry = Object.values(users).find(u => u.email === email);
  if (!userEntry) {
    return { success: false, message: '邮箱或密码错误' };
  }

  if (userEntry.password !== password) {
    return { success: false, message: '邮箱或密码错误' };
  }

  // 生成token并保存登录状态
  const token = generateToken(userEntry.user.id);
  const authState: AuthState = {
    user: userEntry.user,
    token,
    isAuthenticated: true,
  };
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  }

  return { success: true, message: '登录成功', user: userEntry.user, token };
}

// 退出登录
export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
}

// 获取当前登录状态
export function getAuthState(): AuthState {
  if (typeof window === 'undefined') {
    return { user: null, token: null, isAuthenticated: false };
  }
  const auth = localStorage.getItem(AUTH_KEY);
  if (auth) {
    return JSON.parse(auth);
  }
  return { user: null, token: null, isAuthenticated: false };
}

// 更新用户信息
export function updateUser(userId: string, updates: Partial<User>): boolean {
  const users = getUsers();
  if (!users[userId]) return false;

  users[userId].user = { ...users[userId].user, ...updates };
  saveUsers(users);

  // 同时更新当前登录状态
  const authState = getAuthState();
  if (authState.user?.id === userId) {
    authState.user = { ...authState.user, ...updates };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  }

  return true;
}

// 使用一次生成次数
export function useGeneration(userId: string): boolean {
  const users = getUsers();
  if (!users[userId]) return false;

  const user = users[userId].user;
  if (user.remainingUses <= 0) return false;

  user.remainingUses -= 1;
  user.totalUsed += 1;
  saveUsers(users);

  // 更新当前登录状态
  const authState = getAuthState();
  if (authState.user?.id === userId) {
    authState.user.remainingUses = user.remainingUses;
    authState.user.totalUsed = user.totalUsed;
    localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  }

  return true;
}

// 充值增加次数
export function addUses(userId: string, amount: number, membership: User['membership']): boolean {
  const users = getUsers();
  if (!users[userId]) return false;

  const user = users[userId].user;
  user.remainingUses += amount;
  user.membership = membership;
  
  if (membership !== 'free') {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);
    user.membershipExpiry = expiry.toISOString();
  }

  saveUsers(users);

  // 更新当前登录状态
  const authState = getAuthState();
  if (authState.user?.id === userId) {
    authState.user.remainingUses = user.remainingUses;
    authState.user.membership = user.membership;
    authState.user.membershipExpiry = user.membershipExpiry;
    localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  }

  return true;
}
