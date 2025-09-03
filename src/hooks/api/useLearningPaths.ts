import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys, apiEndpoints } from '@/lib/api/config';
import type { 
  LearningPath, 
  Lesson, 
  UserProgress,
  PaginatedResponse,
  ApiSuccessResponse 
} from '@/types/api';

interface LearningPathsParams {
  category?: string;
  difficulty?: string;
  ageGroup?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const useLearningPaths = (params?: LearningPathsParams) => {
  return useQuery({
    queryKey: queryKeys.learningPaths.list(params),
    queryFn: async (): Promise<PaginatedResponse<LearningPath>> => {
      const response = await apiClient.get<ApiSuccessResponse<PaginatedResponse<LearningPath>>>(
        apiEndpoints.learningPaths.list,
        params
      );
      return response.data;
    },
  });
};

export const useInfiniteLearningPaths = (params?: Omit<LearningPathsParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: queryKeys.learningPaths.list(params),
    queryFn: async ({ pageParam = 1 }): Promise<PaginatedResponse<LearningPath>> => {
      const response = await apiClient.get<ApiSuccessResponse<PaginatedResponse<LearningPath>>>(
        apiEndpoints.learningPaths.list,
        { ...params, page: pageParam }
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const useLearningPath = (id: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.learningPaths.detail(id),
    queryFn: async (): Promise<LearningPath> => {
      const response = await apiClient.get<ApiSuccessResponse<LearningPath>>(
        apiEndpoints.learningPaths.detail(id)
      );
      return response.data;
    },
    enabled: enabled && !!id,
  });
};

export const useLearningPathLessons = (pathId: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.learningPaths.lessons(pathId),
    queryFn: async (): Promise<Lesson[]> => {
      const response = await apiClient.get<ApiSuccessResponse<Lesson[]>>(
        apiEndpoints.learningPaths.lessons(pathId)
      );
      return response.data;
    },
    enabled: enabled && !!pathId,
  });
};

export const useLearningPathProgress = (pathId: string, userId?: string) => {
  return useQuery({
    queryKey: queryKeys.learningPaths.progress(pathId, userId),
    queryFn: async (): Promise<UserProgress[]> => {
      const response = await apiClient.get<ApiSuccessResponse<UserProgress[]>>(
        apiEndpoints.learningPaths.progress(pathId),
        userId ? { userId } : undefined
      );
      return response.data;
    },
    enabled: !!pathId,
  });
};

export const useEnrollInPath = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (pathId: string): Promise<UserProgress> => {
      const response = await apiClient.post<ApiSuccessResponse<UserProgress>>(
        apiEndpoints.learningPaths.enroll(pathId)
      );
      return response.data;
    },
    onSuccess: (data, pathId) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.learningPaths.progress(pathId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.stats(data.userId) });
    },
  });
};

export const useSearchLearningPaths = (query: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.learningPaths.list({ search: query }),
    queryFn: async (): Promise<PaginatedResponse<LearningPath>> => {
      const response = await apiClient.get<ApiSuccessResponse<PaginatedResponse<LearningPath>>>(
        apiEndpoints.learningPaths.list,
        { search: query, limit: 20 }
      );
      return response.data;
    },
    enabled: options?.enabled !== false && query.length >= 2,
    staleTime: 30 * 1000, // 30 seconds for search results
  });
};