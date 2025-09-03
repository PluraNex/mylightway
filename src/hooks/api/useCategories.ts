import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys, apiEndpoints } from '@/lib/api/config';
import type { 
  ContentCategory, 
  AgeGroup,
  ApiSuccessResponse 
} from '@/types/api';

export const useContentCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories.content(),
    queryFn: async (): Promise<ContentCategory[]> => {
      const response = await apiClient.get<ApiSuccessResponse<ContentCategory[]>>(
        apiEndpoints.categories.content
      );
      return response.data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
  });
};

export const useAgeGroups = () => {
  return useQuery({
    queryKey: queryKeys.categories.ageGroups(),
    queryFn: async (): Promise<AgeGroup[]> => {
      const response = await apiClient.get<ApiSuccessResponse<AgeGroup[]>>(
        apiEndpoints.categories.ageGroups
      );
      return response.data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour - age groups rarely change
  });
};