import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys, apiEndpoints } from '@/lib/api/config';
import type { 
  UserProfile, 
  UserStats, 
  UserPreferences,
  ApiSuccessResponse 
} from '@/types/api';

export const useUserProfile = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.users.profile(userId),
    queryFn: async (): Promise<UserProfile> => {
      const response = await apiClient.get<ApiSuccessResponse<UserProfile>>(
        apiEndpoints.users.profile(userId)
      );
      return response.data;
    },
    enabled: enabled && !!userId,
  });
};

export const useUserStats = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.users.stats(userId),
    queryFn: async (): Promise<UserStats> => {
      const response = await apiClient.get<ApiSuccessResponse<UserStats>>(
        apiEndpoints.users.stats(userId)
      );
      return response.data;
    },
    enabled: enabled && !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes - stats change frequently
  });
};

export const useUserPreferences = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.users.preferences(userId),
    queryFn: async (): Promise<UserPreferences> => {
      const response = await apiClient.get<ApiSuccessResponse<UserPreferences>>(
        apiEndpoints.users.preferences(userId)
      );
      return response.data;
    },
    enabled: enabled && !!userId,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { userId: string; updates: Partial<UserProfile> }): Promise<UserProfile> => {
      const response = await apiClient.patch<ApiSuccessResponse<UserProfile>>(
        apiEndpoints.users.updateProfile(data.userId),
        data.updates
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update the profile cache
      queryClient.setQueryData(
        queryKeys.users.profile(variables.userId),
        data
      );
      
      // Update auth profile if it's the current user
      const authProfile = queryClient.getQueryData(queryKeys.auth.profile());
      if (authProfile && (authProfile as UserProfile).id === variables.userId) {
        queryClient.setQueryData(queryKeys.auth.profile(), data);
      }
    },
  });
};

export const useUpdateUserPreferences = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { userId: string; preferences: Partial<UserPreferences> }): Promise<UserPreferences> => {
      const response = await apiClient.patch<ApiSuccessResponse<UserPreferences>>(
        apiEndpoints.users.updatePreferences(data.userId),
        data.preferences
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update preferences cache
      queryClient.setQueryData(
        queryKeys.users.preferences(variables.userId),
        data
      );
      
      // Update profile cache to include new preferences
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.users.profile(variables.userId) 
      });
    },
  });
};