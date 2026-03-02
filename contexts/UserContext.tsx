'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, login as authLogin, register as authRegister, logout as authLogout, getAuthState, updateUser, addUses, useGeneration } from '@/lib/auth';

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string, nickname: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUserInfo: (updates: Partial<User>) => boolean;
  addGenerationUses: (amount: number, membership: User['membership']) => boolean;
  useOneGeneration: () => boolean;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // 初始化时从 localStorage 读取登录状态
  useEffect(() => {
    const state = getAuthState();
    setAuthState(state);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = authLogin(email, password);
    if (result.success && result.user) {
      setAuthState({
        user: result.user,
        token: result.token || null,
        isAuthenticated: true,
      });
    }
    return { success: result.success, message: result.message };
  };

  const register = async (email: string, password: string, nickname: string) => {
    const result = authRegister(email, password, nickname);
    return { success: result.success, message: result.message };
  };

  const logout = () => {
    authLogout();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  const updateUserInfo = (updates: Partial<User>) => {
    if (!authState.user) return false;
    const success = updateUser(authState.user.id, updates);
    if (success) {
      setAuthState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...updates } : null,
      }));
    }
    return success;
  };

  const addGenerationUses = (amount: number, membership: User['membership']) => {
    if (!authState.user) return false;
    const success = addUses(authState.user.id, amount, membership);
    if (success) {
      refreshUser();
    }
    return success;
  };

  const useOneGeneration = () => {
    if (!authState.user) return false;
    const success = useGeneration(authState.user.id);
    if (success) {
      refreshUser();
    }
    return success;
  };

  const refreshUser = () => {
    const state = getAuthState();
    setAuthState(state);
  };

  return (
    <UserContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateUserInfo,
        addGenerationUses,
        useOneGeneration,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
