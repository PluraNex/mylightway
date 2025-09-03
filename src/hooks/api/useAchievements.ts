import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys, apiEndpoints } from '@/lib/api/config';
import type {
  Achievement,
  UserAchievement,
  ApiSuccessResponse,
} from '@/types/api';

export const useAchievements = () => {
  return useQuery({
    queryKey: queryKeys.achievements.all(),
    queryFn: async (): Promise<Achievement[]> => {
      const response = await apiClient.get<ApiSuccessResponse<Achievement[]>>(
        apiEndpoints.achievements.list
      );
      return response.data;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes - achievements don't change often
  });
};

export const useUserAchievements = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.achievements.user(userId),
    queryFn: async (): Promise<UserAchievement[]> => {
      const response = await apiClient.get<
        ApiSuccessResponse<UserAchievement[]>
      >(apiEndpoints.achievements.user, userId ? { userId } : undefined);
      return response.data;
    },
  });
};

export const useAvailableAchievements = () => {
  return useQuery({
    queryKey: queryKeys.achievements.available(),
    queryFn: async (): Promise<Achievement[]> => {
      const response = await apiClient.get<ApiSuccessResponse<Achievement[]>>(
        `${apiEndpoints.achievements.list}/available`
      );
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUnlockAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (achievementId: string): Promise<UserAchievement> => {
      const response = await apiClient.post<
        ApiSuccessResponse<UserAchievement>
      >(apiEndpoints.achievements.unlock, { achievementId });
      return response.data;
    },
    onSuccess: data => {
      // Invalidate user achievements to show the new one
      queryClient.invalidateQueries({
        queryKey: queryKeys.achievements.user(data.userId),
      });

      // Update user stats (achievements count)
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.stats(data.userId),
      });
    },
  });
};
