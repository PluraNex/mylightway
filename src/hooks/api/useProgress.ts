import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys, apiEndpoints } from '@/lib/api/config';
import type { 
  UserProgress,
  ApiSuccessResponse 
} from '@/types/api';

export const useUserProgress = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.progress.all(userId),
    queryFn: async (): Promise<UserProgress[]> => {
      const response = await apiClient.get<ApiSuccessResponse<UserProgress[]>>(
        apiEndpoints.progress.user,
        userId ? { userId } : undefined
      );
      return response.data;
    },
  });
};

export const usePathProgress = (pathId: string, userId?: string) => {
  return useQuery({
    queryKey: queryKeys.progress.byPath(pathId, userId),
    queryFn: async (): Promise<UserProgress[]> => {
      const response = await apiClient.get<ApiSuccessResponse<UserProgress[]>>(
        apiEndpoints.progress.byPath(pathId),
        userId ? { userId } : undefined
      );
      return response.data;
    },
    enabled: !!pathId,
  });
};

export const useProgressByLesson = (lessonId: string, userId?: string) => {
  return useQuery({
    queryKey: queryKeys.progress.byLesson(lessonId, userId),
    queryFn: async (): Promise<UserProgress | null> => {
      try {
        const response = await apiClient.get<ApiSuccessResponse<UserProgress>>(
          apiEndpoints.progress.byLesson(lessonId),
          userId ? { userId } : undefined
        );
        return response.data;
      } catch (error: any) {
        if (error.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!lessonId,
  });
};

interface UpdateProgressPayload {
  lessonId?: string;
  pathId?: string;
  status: 'in_progress' | 'completed';
  progress: number;
  score?: number;
  timeSpent: number;
  data?: Record<string, any>;
}

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: UpdateProgressPayload): Promise<UserProgress> => {
      const response = await apiClient.post<ApiSuccessResponse<UserProgress>>(
        apiEndpoints.progress.updateProgress,
        payload
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update specific progress caches
      if (variables.lessonId) {
        queryClient.setQueryData(
          queryKeys.progress.byLesson(variables.lessonId),
          data
        );
      }
      
      // Invalidate broader progress queries
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all() });
      
      if (variables.pathId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.progress.byPath(variables.pathId) 
        });
      }
      
      // Update user stats
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.users.stats(data.userId) 
      });
    },
  });
};

interface BulkUpdateProgressPayload {
  updates: UpdateProgressPayload[];
}

export const useBulkUpdateProgress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: BulkUpdateProgressPayload): Promise<UserProgress[]> => {
      const response = await apiClient.post<ApiSuccessResponse<UserProgress[]>>(
        `${apiEndpoints.progress.updateProgress}/bulk`,
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate all progress-related queries for bulk updates
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all() });
      
      data.forEach(progress => {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.users.stats(progress.userId) 
        });
      });
    },
  });
};