import { createLazyComponent } from '@/utils/lazyLoader';
import { LoadingFallback, DashboardSkeleton } from '@/components/LoadingFallback';
import React from 'react';

// Lazy load all page components with appropriate fallbacks
export const LazyIndex = createLazyComponent(
  () => import('../Index'),
  {
    loadingMessage: 'Carregando página inicial...',
    fallback: () => <LoadingFallback variant="branded" fullScreen />
  }
);

export const LazyDashboard = createLazyComponent(
  () => import('../Dashboard'),
  {
    loadingMessage: 'Carregando dashboard...',
    fallback: DashboardSkeleton
  }
);

export const LazyLearningPath = createLazyComponent(
  () => import('../LearningPath'),
  {
    loadingMessage: 'Carregando trilha de aprendizado...'
  }
);

export const LazyLessonContent = createLazyComponent(
  () => import('../LessonContent'),
  {
    loadingMessage: 'Carregando lição...'
  }
);

export const LazyBibleStudy = createLazyComponent(
  () => import('../BibleStudy'),
  {
    loadingMessage: 'Carregando estudo bíblico...'
  }
);

export const LazyBlog = createLazyComponent(
  () => import('../Blog'),
  {
    loadingMessage: 'Carregando blog...'
  }
);

export const LazyBlogPost = createLazyComponent(
  () => import('../BlogPost'),
  {
    loadingMessage: 'Carregando artigo...'
  }
);

export const LazyAchievements = createLazyComponent(
  () => import('../Achievements'),
  {
    loadingMessage: 'Carregando conquistas...'
  }
);

export const LazyParentsArea = createLazyComponent(
  () => import('../ParentsArea'),
  {
    loadingMessage: 'Carregando área dos pais...'
  }
);

export const LazyNotFound = createLazyComponent(
  () => import('../NotFound'),
  {
    loadingMessage: 'Carregando...'
  }
);

// Component chunks for better code splitting
export const LazyComponents = createLazyComponent(
  () => import('../../components/LearningPaths'),
  {
    loadingMessage: 'Carregando componentes...'
  }
);