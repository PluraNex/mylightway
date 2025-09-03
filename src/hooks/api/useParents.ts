import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys, apiEndpoints } from '@/lib/api/config';
import type { 
  ParentDashboard, 
  ChildProgress, 
  ParentSettings,
  User,
  ApiSuccessResponse 
} from '@/types/api';

export const useParentDashboard = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.parents.dashboard(userId),
    queryFn: async (): Promise<ParentDashboard> => {
      const response = await apiClient.get<ApiSuccessResponse<ParentDashboard>>(
        apiEndpoints.parents.dashboard,
        userId ? { userId } : undefined
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes - dashboard data changes frequently
  });
};

export const useParentChildren = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.parents.children(userId),
    queryFn: async (): Promise<User[]> => {
      const response = await apiClient.get<ApiSuccessResponse<User[]>>(
        apiEndpoints.parents.children,
        userId ? { userId } : undefined
      );
      return response.data;
    },
  });
};

export const useChildProgress = (childId: string, parentId?: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.parents.childProgress(childId, parentId),
    queryFn: async (): Promise<ChildProgress> => {
      const response = await apiClient.get<ApiSuccessResponse<ChildProgress>>(
        apiEndpoints.parents.childProgress(childId),
        parentId ? { parentId } : undefined
      );
      return response.data;
    },
    enabled: enabled && !!childId,
  });
};

export const useParentSettings = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.parents.dashboard(userId), // Settings are part of dashboard
    queryFn: async (): Promise<ParentSettings> => {
      const response = await apiClient.get<ApiSuccessResponse<ParentSettings>>(
        apiEndpoints.parents.settings,
        userId ? { userId } : undefined
      );
      return response.data;
    },
    select: (data) => (data as ParentDashboard).settings, // Extract settings from dashboard
  });
};

export const useUpdateParentSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (settings: Partial<ParentSettings>): Promise<ParentSettings> => {
      const response = await apiClient.patch<ApiSuccessResponse<ParentSettings>>(
        apiEndpoints.parents.updateSettings,
        settings
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate parent dashboard to refetch with new settings
      queryClient.invalidateQueries({ queryKey: queryKeys.parents.dashboard() });
    },
  });
};