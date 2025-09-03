import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys, apiEndpoints } from '@/lib/api/config';
import type { 
  Lesson, 
  UserProgress,
  ProgressAttempt,
  ApiSuccessResponse 
} from '@/types/api';

export const useLesson = (id: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.lessons.detail(id),
    queryFn: async (): Promise<Lesson> => {
      const response = await apiClient.get<ApiSuccessResponse<Lesson>>(
        apiEndpoints.lessons.detail(id)
      );
      return response.data;
    },
    enabled: enabled && !!id,
  });
};

export const useLessonContent = (id: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.lessons.content(id),
    queryFn: async (): Promise<Lesson> => {
      const response = await apiClient.get<ApiSuccessResponse<Lesson>>(
        apiEndpoints.lessons.content(id)
      );
      return response.data;
    },
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes - content doesn't change often
  });
};

export const useLessonProgress = (lessonId: string, userId?: string) => {
  return useQuery({
    queryKey: queryKeys.lessons.progress(lessonId, userId),
    queryFn: async (): Promise<UserProgress | null> => {
      try {
        const response = await apiClient.get<ApiSuccessResponse<UserProgress>>(
          apiEndpoints.lessons.progress(lessonId),
          userId ? { userId } : undefined
        );
        return response.data;
      } catch (error: any) {
        if (error.status === 404) {
          return null; // No progress yet
        }
        throw error;
      }
    },
    enabled: !!lessonId,
  });
};

interface StartLessonData {
  lessonId: string;
  pathId?: string;
}

export const useStartLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: StartLessonData): Promise<ProgressAttempt> => {
      const response = await apiClient.post<ApiSuccessResponse<ProgressAttempt>>(
        apiEndpoints.lessons.progress(data.lessonId),
        { action: 'start', pathId: data.pathId }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate lesson progress
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.lessons.progress(variables.lessonId) 
      });
      // Invalidate path progress if provided
      if (variables.pathId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.learningPaths.progress(variables.pathId) 
        });
      }
      // Invalidate user progress
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all() });
    },
  });
};

interface UpdateProgressData {
  lessonId: string;
  pathId?: string;
  progress: number;
  timeSpent: number;
  data?: Record<string, any>;
}

export const useUpdateLessonProgress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateProgressData): Promise<UserProgress> => {
      const response = await apiClient.patch<ApiSuccessResponse<UserProgress>>(
        apiEndpoints.lessons.progress(data.lessonId),
        {
          progress: data.progress,
          timeSpent: data.timeSpent,
          data: data.data,
          pathId: data.pathId,
        }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update the lesson progress in cache
      queryClient.setQueryData(
        queryKeys.lessons.progress(variables.lessonId),
        data
      );
      // Invalidate path progress if provided
      if (variables.pathId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.learningPaths.progress(variables.pathId) 
        });
      }
      // Invalidate user stats for progress updates
      queryClient.invalidateQueries({ queryKey: queryKeys.users.stats(data.userId) });
    },
  });
};

interface CompleteLessonData {
  lessonId: string;
  pathId?: string;
  score?: number;
  timeSpent: number;
  quizAnswers?: Record<string, any>;
}

export const useCompleteLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CompleteLessonData): Promise<UserProgress> => {
      const response = await apiClient.post<ApiSuccessResponse<UserProgress>>(
        apiEndpoints.lessons.complete(data.lessonId),
        {
          score: data.score,
          timeSpent: data.timeSpent,
          quizAnswers: data.quizAnswers,
          pathId: data.pathId,
        }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update lesson progress
      queryClient.setQueryData(
        queryKeys.lessons.progress(variables.lessonId),
        data
      );
      // Invalidate related queries
      if (variables.pathId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.learningPaths.progress(variables.pathId) 
        });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.stats(data.userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.achievements.user() });
    },
  });
};