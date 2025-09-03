export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  avatar?: string;
  parentId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  category: 'reading' | 'completion' | 'streak' | 'social';
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  ageGroup: string;
  estimatedDuration: number;
  lessons: Lesson[];
  completed: boolean;
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'reading' | 'video' | 'quiz' | 'activity';
  duration: number;
  completed: boolean;
  score?: number;
}

export interface UserProgress {
  currentPath?: string;
  currentLesson?: string;
  totalLessonsCompleted: number;
  streakDays: number;
  lastStudyDate?: Date;
  achievements: Achievement[];
}

export interface AppPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  language: 'pt' | 'en';
}

export interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Learning state
  learningPaths: LearningPath[];
  userProgress: UserProgress;
  
  // UI state
  preferences: AppPreferences;
  isLoading: boolean;
  error: string | null;
}