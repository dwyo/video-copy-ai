import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 简单的本地存储工具（用于免费次数限制）
export class UsageTracker {
  private static readonly STORAGE_KEY = 'video_copy_ai_usage';
  private static readonly DAILY_LIMIT = 3;

  static getRemainingUses(): number {
    if (typeof window === 'undefined') return this.DAILY_LIMIT;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return this.DAILY_LIMIT;

      const data = JSON.parse(stored);
      const today = new Date().toDateString();

      if (data.date !== today) {
        // 新的一天，重置次数
        this.resetUsage();
        return this.DAILY_LIMIT;
      }

      return Math.max(0, this.DAILY_LIMIT - data.count);
    } catch {
      return this.DAILY_LIMIT;
    }
  }

  static recordUsage(): boolean {
    if (typeof window === 'undefined') return true;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const today = new Date().toDateString();
      
      let data = { date: today, count: 0 };
      if (stored) {
        data = JSON.parse(stored);
        if (data.date !== today) {
          data = { date: today, count: 0 };
        }
      }

      if (data.count >= this.DAILY_LIMIT) {
        return false;
      }

      data.count++;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch {
      return true; // 出错时允许使用
    }
  }

  static resetUsage(): void {
    if (typeof window === 'undefined') return;
    
    const today = new Date().toDateString();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ date: today, count: 0 }));
  }

  static getUsageCount(): number {
    if (typeof window === 'undefined') return 0;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return 0;

      const data = JSON.parse(stored);
      const today = new Date().toDateString();

      if (data.date !== today) return 0;
      return data.count;
    } catch {
      return 0;
    }
  }
}