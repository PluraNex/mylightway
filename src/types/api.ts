// API Types for MyLightWay

// Authentication
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  parentEmail?: string;
}

// User Management
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  avatar?: string;
  role: 'child' | 'parent' | 'admin';
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'pt' | 'en' | 'es';
  fontSize: 'small' | 'medium' | 'large';
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  autoplay: boolean;
}

export interface UserStats {
  totalLessons: number;
  completedLessons: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyTime: number; // in minutes
  achievementsCount: number;
  level: number;
  experience: number;
}

// Learning Content
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  slug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  ageGroups: AgeGroup[];
  estimatedDuration: number; // in minutes
  lessonsCount: number;
  completedLessons?: number;
  progress?: number;
  category: ContentCategory;
  tags: string[];
  imageUrl?: string;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  pathId: string;
  title: string;
  description: string;
  content: LessonContent;
  type: LessonType;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  prerequisites?: string[];
  objectives: string[];
  isRequired: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LessonContent {
  text?: string;
  videoUrl?: string;
  audioUrl?: string;
  images?: MediaFile[];
  activities?: Activity[];
  quiz?: Quiz;
  resources?: Resource[];
}

export interface Activity {
  id: string;
  type: 'drawing' | 'matching' | 'sorting' | 'memory' | 'puzzle';
  title: string;
  instructions: string;
  data: Record<string, any>;
  points: number;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  passingScore: number;
  maxAttempts: number;
  timeLimit?: number; // in minutes
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'ordering';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video' | 'audio' | 'document';
  title?: string;
  description?: string;
  size: number;
  duration?: number; // for video/audio
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: 'link' | 'download' | 'reference';
  url: string;
  isExternal: boolean;
}

// Progress Tracking
export interface UserProgress {
  userId: string;
  pathId: string;
  lessonId?: string;
  status: ProgressStatus;
  progress: number; // 0-100
  score?: number;
  timeSpent: number; // in minutes
  lastAccessedAt: string;
  completedAt?: string;
  attempts: ProgressAttempt[];
}

export interface ProgressAttempt {
  id: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
  timeSpent: number;
  data?: Record<string, any>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  condition: AchievementCondition;
  points: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  isSecret: boolean;
  createdAt: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  achievement: Achievement;
  unlockedAt: string;
  progress?: number;
}

export interface AchievementCondition {
  type:
    | 'lessons_completed'
    | 'streak_days'
    | 'time_spent'
    | 'quiz_score'
    | 'path_completed';
  target: number;
  pathId?: string;
  category?: string;
}

// Content Management
export interface ContentCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon: string;
  order: number;
}

export interface AgeGroup {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  color: string;
}

// Blog & Community
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: User;
  category: ContentCategory;
  tags: string[];
  featuredImage?: MediaFile;
  isPublished: boolean;
  publishedAt?: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  parentId?: string;
  replies?: Comment[];
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

// Parent Dashboard
export interface ParentDashboard {
  children: ChildProgress[];
  recentActivity: ActivityLog[];
  recommendations: Recommendation[];
  settings: ParentSettings;
}

export interface ChildProgress {
  child: User;
  currentPath?: LearningPath;
  progress: UserProgress[];
  achievements: UserAchievement[];
  stats: UserStats;
  recentActivity: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  data?: Record<string, any>;
  createdAt: string;
}

export interface Recommendation {
  id: string;
  type: 'path' | 'lesson' | 'activity';
  title: string;
  description: string;
  reason: string;
  targetId: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface ParentSettings {
  notifications: NotificationSettings;
  timeRestrictions: TimeRestriction[];
  contentFilters: ContentFilter[];
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  achievements: boolean;
  progress: boolean;
  reminders: boolean;
}

export interface TimeRestriction {
  dayOfWeek: number; // 0-6
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  maxDuration: number; // in minutes
}

export interface ContentFilter {
  type: 'age' | 'category' | 'difficulty';
  values: string[];
  action: 'allow' | 'block';
}

// Enums
export type ProgressStatus =
  | 'not_started'
  | 'in_progress'
  | 'completed'
  | 'locked';
export type LessonType =
  | 'reading'
  | 'video'
  | 'audio'
  | 'interactive'
  | 'quiz'
  | 'activity';
export type AchievementCategory =
  | 'completion'
  | 'streak'
  | 'mastery'
  | 'exploration'
  | 'social'
  | 'special';
export type ActivityType =
  | 'lesson_started'
  | 'lesson_completed'
  | 'quiz_attempted'
  | 'achievement_unlocked'
  | 'path_started'
  | 'path_completed';

// API Endpoints Response Types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}
