import { QueryClient, type DefaultOptions } from '@tanstack/react-query';
import { env } from '@/lib/env';

export const queryKeys = {
  auth: {
    profile: () => ['auth', 'profile'] as const,
    session: () => ['auth', 'session'] as const,
  },
  users: {
    all: () => ['users'] as const,
    profile: (id: string) => ['users', 'profile', id] as const,
    stats: (id: string) => ['users', 'stats', id] as const,
    preferences: (id: string) => ['users', 'preferences', id] as const,
  },
  learningPaths: {
    all: () => ['learning-paths'] as const,
    list: (params?: Record<string, any>) =>
      ['learning-paths', 'list', params] as const,
    detail: (id: string) => ['learning-paths', 'detail', id] as const,
    lessons: (pathId: string) => ['learning-paths', pathId, 'lessons'] as const,
    progress: (pathId: string, userId?: string) =>
      ['learning-paths', pathId, 'progress', userId] as const,
  },
  lessons: {
    all: () => ['lessons'] as const,
    detail: (id: string) => ['lessons', 'detail', id] as const,
    content: (id: string) => ['lessons', 'content', id] as const,
    progress: (lessonId: string, userId?: string) =>
      ['lessons', lessonId, 'progress', userId] as const,
  },
  progress: {
    all: (userId?: string) => ['progress', userId] as const,
    byPath: (pathId: string, userId?: string) =>
      ['progress', 'path', pathId, userId] as const,
    byLesson: (lessonId: string, userId?: string) =>
      ['progress', 'lesson', lessonId, userId] as const,
  },
  achievements: {
    all: () => ['achievements'] as const,
    user: (userId?: string) => ['achievements', 'user', userId] as const,
    available: () => ['achievements', 'available'] as const,
  },
  blog: {
    all: () => ['blog'] as const,
    list: (params?: Record<string, any>) => ['blog', 'list', params] as const,
    detail: (slug: string) => ['blog', 'detail', slug] as const,
    comments: (postId: string) => ['blog', postId, 'comments'] as const,
  },
  parents: {
    dashboard: (userId?: string) => ['parents', 'dashboard', userId] as const,
    children: (userId?: string) => ['parents', 'children', userId] as const,
    childProgress: (childId: string, parentId?: string) =>
      ['parents', 'child-progress', childId, parentId] as const,
  },
  categories: {
    all: () => ['categories'] as const,
    content: () => ['categories', 'content'] as const,
    ageGroups: () => ['categories', 'age-groups'] as const,
  },
} as const;

const queryConfig: DefaultOptions = {
  queries: {
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  },
  mutations: {
    retry: (failureCount, error: any) => {
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export const apiEndpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  users: {
    profile: (id: string) => `/users/${id}/profile`,
    stats: (id: string) => `/users/${id}/stats`,
    preferences: (id: string) => `/users/${id}/preferences`,
    updatePreferences: (id: string) => `/users/${id}/preferences`,
    updateProfile: (id: string) => `/users/${id}/profile`,
  },
  learningPaths: {
    list: '/learning-paths',
    detail: (id: string) => `/learning-paths/${id}`,
    lessons: (id: string) => `/learning-paths/${id}/lessons`,
    enroll: (id: string) => `/learning-paths/${id}/enroll`,
    progress: (id: string) => `/learning-paths/${id}/progress`,
  },
  lessons: {
    detail: (id: string) => `/lessons/${id}`,
    content: (id: string) => `/lessons/${id}/content`,
    complete: (id: string) => `/lessons/${id}/complete`,
    progress: (id: string) => `/lessons/${id}/progress`,
  },
  progress: {
    user: '/progress',
    updateProgress: '/progress',
    byPath: (pathId: string) => `/progress/paths/${pathId}`,
    byLesson: (lessonId: string) => `/progress/lessons/${lessonId}`,
  },
  achievements: {
    list: '/achievements',
    user: '/achievements/user',
    unlock: '/achievements/unlock',
  },
  blog: {
    list: '/blog',
    detail: (slug: string) => `/blog/${slug}`,
    comments: (id: string) => `/blog/${id}/comments`,
    like: (id: string) => `/blog/${id}/like`,
    createComment: (id: string) => `/blog/${id}/comments`,
  },
  parents: {
    dashboard: '/parents/dashboard',
    children: '/parents/children',
    childProgress: (childId: string) => `/parents/children/${childId}/progress`,
    settings: '/parents/settings',
    updateSettings: '/parents/settings',
  },
  categories: {
    content: '/categories/content',
    ageGroups: '/categories/age-groups',
  },
} as const;
