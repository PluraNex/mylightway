import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AppState, User, LearningPath, Achievement, AppPreferences } from './types';

interface AppActions {
  // User actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  
  // Learning actions
  setLearningPaths: (paths: LearningPath[]) => void;
  updateProgress: (lessonId: string, completed: boolean, score?: number) => void;
  addAchievement: (achievement: Achievement) => void;
  updateStreak: () => void;
  
  // Preferences actions
  setTheme: (theme: AppPreferences['theme']) => void;
  setFontSize: (fontSize: AppPreferences['fontSize']) => void;
  toggleSound: () => void;
  toggleNotifications: () => void;
  setLanguage: (language: AppPreferences['language']) => void;
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const initialState: AppState = {
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
};

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // User actions
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        
        login: async (email, password) => {
          set({ isLoading: true, error: null });
          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock user data
            const user: User = {
              id: '1',
              name: 'João Silva',
              email,
              age: 8,
              avatar: '/avatars/default.png',
            };
            
            set({ user, isAuthenticated: true, isLoading: false });
          } catch (error) {
            set({ error: 'Erro ao fazer login', isLoading: false });
          }
        },
        
        logout: () => set({ user: null, isAuthenticated: false }),

        // Learning actions
        setLearningPaths: (paths) => set({ learningPaths: paths }),
        
        updateProgress: (lessonId, completed, score) => {
          const state = get();
          const updatedPaths = state.learningPaths.map(path => ({
            ...path,
            lessons: path.lessons.map(lesson => 
              lesson.id === lessonId 
                ? { ...lesson, completed, score }
                : lesson
            ),
          }));
          
          const totalCompleted = updatedPaths.reduce(
            (total, path) => total + path.lessons.filter(l => l.completed).length,
            0
          );
          
          set({
            learningPaths: updatedPaths,
            userProgress: {
              ...state.userProgress,
              totalLessonsCompleted: totalCompleted,
              lastStudyDate: new Date(),
            },
          });
        },
        
        addAchievement: (achievement) => {
          const state = get();
          const exists = state.userProgress.achievements.some(a => a.id === achievement.id);
          
          if (!exists) {
            set({
              userProgress: {
                ...state.userProgress,
                achievements: [...state.userProgress.achievements, achievement],
              },
            });
          }
        },
        
        updateStreak: () => {
          const state = get();
          const today = new Date();
          const lastStudy = state.userProgress.lastStudyDate;
          
          if (!lastStudy) {
            set({
              userProgress: {
                ...state.userProgress,
                streakDays: 1,
                lastStudyDate: today,
              },
            });
            return;
          }
          
          const daysDiff = Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysDiff === 1) {
            // Consecutive day
            set({
              userProgress: {
                ...state.userProgress,
                streakDays: state.userProgress.streakDays + 1,
                lastStudyDate: today,
              },
            });
          } else if (daysDiff > 1) {
            // Streak broken
            set({
              userProgress: {
                ...state.userProgress,
                streakDays: 1,
                lastStudyDate: today,
              },
            });
          }
        },

        // Preferences actions
        setTheme: (theme) => 
          set(state => ({
            preferences: { ...state.preferences, theme }
          })),
        
        setFontSize: (fontSize) =>
          set(state => ({
            preferences: { ...state.preferences, fontSize }
          })),
        
        toggleSound: () =>
          set(state => ({
            preferences: { 
              ...state.preferences, 
              soundEnabled: !state.preferences.soundEnabled 
            }
          })),
        
        toggleNotifications: () =>
          set(state => ({
            preferences: { 
              ...state.preferences, 
              notificationsEnabled: !state.preferences.notificationsEnabled 
            }
          })),
        
        setLanguage: (language) =>
          set(state => ({
            preferences: { ...state.preferences, language }
          })),

        // UI actions
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),
      }),
      {
        name: 'mylightway-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          userProgress: state.userProgress,
          preferences: state.preferences,
        }),
      }
    ),
    {
      name: 'mylightway-store',
    }
  )
);

// Selectors for better performance
export const useUser = () => useAppStore(state => state.user);
export const useIsAuthenticated = () => useAppStore(state => state.isAuthenticated);
export const useLearningPaths = () => useAppStore(state => state.learningPaths);
export const useUserProgress = () => useAppStore(state => state.userProgress);
export const usePreferences = () => useAppStore(state => state.preferences);
export const useLoading = () => useAppStore(state => state.isLoading);
export const useError = () => useAppStore(state => state.error);