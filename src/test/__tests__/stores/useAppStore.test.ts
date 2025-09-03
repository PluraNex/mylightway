import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppStore } from '@/stores/useAppStore';
import type { User } from '@/stores/types';

// Mock zustand persist
vi.mock('zustand/middleware', () => ({
  devtools: (fn: any) => fn,
  persist: (fn: any) => fn,
}));

describe('useAppStore', () => {
  beforeEach(() => {
    // Clear store state before each test
    useAppStore.setState({
      user: null,
      isAuthenticated: false,
      learningPaths: [],
      userProgress: {
        totalLessonsCompleted: 0,
        streakDays: 0,
        achievements: [],
      },
      preferences: {
        theme: 'system',
        fontSize: 'medium',
        soundEnabled: true,
        notificationsEnabled: true,
        language: 'pt',
      },
      isLoading: false,
      error: null,
    });
  });

  describe('User Actions', () => {
    it('should set user and update authentication status', () => {
      const { result } = renderHook(() => useAppStore());

      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        age: 8,
      };

      act(() => {
        result.current.setUser(mockUser);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should clear user on logout', () => {
      const { result } = renderHook(() => useAppStore());

      // First set a user
      act(() => {
        result.current.setUser({
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          age: 8,
        });
      });

      // Then logout
      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should handle login process', async () => {
      const { result } = renderHook(() => useAppStore());

      const loginPromise = act(async () => {
        await result.current.login('test@example.com', 'password');
      });

      // Should be loading during login
      expect(result.current.isLoading).toBe(true);

      await loginPromise;

      // Should be logged in after login
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user?.email).toBe('test@example.com');
    });
  });

  describe('Progress Actions', () => {
    it('should update lesson progress', () => {
      const { result } = renderHook(() => useAppStore());

      // Set initial learning paths
      act(() => {
        result.current.setLearningPaths([
          {
            id: '1',
            title: 'Test Path',
            description: 'Test',
            difficulty: 'beginner',
            ageGroup: '6-8',
            estimatedDuration: 30,
            lessons: [
              {
                id: 'lesson1',
                title: 'Test Lesson',
                content: 'Test content',
                type: 'reading',
                duration: 10,
                completed: false,
              },
            ],
            completed: false,
            progress: 0,
          },
        ]);
      });

      // Update progress
      act(() => {
        result.current.updateProgress('lesson1', true, 95);
      });

      const lesson = result.current.learningPaths[0].lessons[0];
      expect(lesson.completed).toBe(true);
      expect(lesson.score).toBe(95);
      expect(result.current.userProgress.totalLessonsCompleted).toBe(1);
    });

    it('should update streak correctly', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        result.current.updateStreak();
      });

      expect(result.current.userProgress.streakDays).toBe(1);
      expect(result.current.userProgress.lastStudyDate).toBeInstanceOf(Date);
    });

    it('should add achievements without duplicates', () => {
      const { result } = renderHook(() => useAppStore());

      const achievement = {
        id: 'ach1',
        title: 'First Achievement',
        description: 'Your first achievement',
        icon: 'trophy',
        category: 'completion' as const,
        unlockedAt: new Date(),
      };

      // Add achievement first time
      act(() => {
        result.current.addAchievement(achievement);
      });

      expect(result.current.userProgress.achievements).toHaveLength(1);

      // Try to add same achievement again
      act(() => {
        result.current.addAchievement(achievement);
      });

      // Should still only have one
      expect(result.current.userProgress.achievements).toHaveLength(1);
    });
  });

  describe('Preferences Actions', () => {
    it('should update theme preference', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.preferences.theme).toBe('dark');
    });

    it('should toggle sound preference', () => {
      const { result } = renderHook(() => useAppStore());

      const initialSound = result.current.preferences.soundEnabled;

      act(() => {
        result.current.toggleSound();
      });

      expect(result.current.preferences.soundEnabled).toBe(!initialSound);
    });

    it('should toggle notifications preference', () => {
      const { result } = renderHook(() => useAppStore());

      const initialNotifications =
        result.current.preferences.notificationsEnabled;

      act(() => {
        result.current.toggleNotifications();
      });

      expect(result.current.preferences.notificationsEnabled).toBe(
        !initialNotifications
      );
    });

    it('should update language preference', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        result.current.setLanguage('en');
      });

      expect(result.current.preferences.language).toBe('en');
    });
  });

  describe('UI Actions', () => {
    it('should set loading state', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        result.current.setLoading(true);
      });

      expect(result.current.isLoading).toBe(true);
    });

    it('should set and clear error', () => {
      const { result } = renderHook(() => useAppStore());

      const errorMessage = 'Something went wrong';

      act(() => {
        result.current.setError(errorMessage);
      });

      expect(result.current.error).toBe(errorMessage);

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBe(null);
    });
  });

  describe('Selectors', () => {
    it('should provide selector hooks', () => {
      const { result: userResult } = renderHook(() =>
        useAppStore(state => state.user)
      );
      const { result: authResult } = renderHook(() =>
        useAppStore(state => state.isAuthenticated)
      );
      const { result: prefsResult } = renderHook(() =>
        useAppStore(state => state.preferences)
      );

      expect(userResult.current).toBe(null);
      expect(authResult.current).toBe(false);
      expect(prefsResult.current).toEqual({
        theme: 'system',
        fontSize: 'medium',
        soundEnabled: true,
        notificationsEnabled: true,
        language: 'pt',
      });
    });
  });
});
