import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Test utilities for common patterns
export const createMockUser = () => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  age: 8,
  role: 'child' as const,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
});

export const createMockLearningPath = () => ({
  id: '1',
  title: 'Test Learning Path',
  description: 'A test learning path',
  slug: 'test-path',
  difficulty: 'beginner' as const,
  ageGroups: [],
  estimatedDuration: 30,
  lessonsCount: 5,
  category: {
    id: '1',
    name: 'Test Category',
    slug: 'test-category',
    color: '#000000',
    icon: 'book',
    order: 1,
  },
  tags: ['test'],
  isPublished: true,
  order: 1,
  lessons: [],
  completed: false,
  progress: 0,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
});

export const createMockLesson = () => ({
  id: '1',
  pathId: '1',
  title: 'Test Lesson',
  description: 'A test lesson',
  content: {
    text: 'This is a test lesson content',
  },
  type: 'reading' as const,
  duration: 10,
  difficulty: 'beginner' as const,
  order: 1,
  objectives: ['Learn something'],
  isRequired: true,
  isPublished: true,
  completed: false,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
});

export const createMockAchievement = () => ({
  id: '1',
  title: 'Test Achievement',
  description: 'A test achievement',
  icon: 'trophy',
  category: 'completion' as const,
  condition: {
    type: 'lessons_completed' as const,
    target: 1,
  },
  points: 100,
  rarity: 'common' as const,
  isSecret: false,
  createdAt: '2024-01-01T00:00:00.000Z',
});

// Mock handlers for common API calls
export const mockHandlers = {
  login: () => ({
    user: createMockUser(),
    token: 'mock-token',
    refreshToken: 'mock-refresh-token',
    expiresIn: 3600,
  }),

  getLearningPaths: () => [createMockLearningPath()],

  getLesson: (id: string) => ({
    ...createMockLesson(),
    id,
  }),

  getUserProgress: () => ({
    userId: '1',
    pathId: '1',
    status: 'in_progress' as const,
    progress: 50,
    timeSpent: 15,
    lastAccessedAt: '2024-01-01T00:00:00.000Z',
    attempts: [],
  }),
};

// Helper to wait for loading states
export const waitForLoadingToFinish = () =>
  new Promise(resolve => setTimeout(resolve, 0));

// Helper to create mock store state
export const createMockStoreState = () => ({
  user: createMockUser(),
  isAuthenticated: true,
  learningPaths: [createMockLearningPath()],
  userProgress: {
    totalLessonsCompleted: 0,
    streakDays: 0,
    achievements: [],
  },
  preferences: {
    theme: 'system' as const,
    fontSize: 'medium' as const,
    soundEnabled: true,
    notificationsEnabled: true,
    language: 'pt' as const,
  },
  isLoading: false,
  error: null,
});
