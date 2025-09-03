import { apiClient } from '@/lib/api/client';
import { apiEndpoints } from '@/lib/api/config';
import type { 
  UserProfile, 
  UserStats, 
  UserPreferences,
  ApiSuccessResponse 
} from '@/types/api';

export class UserService {
  static async getUserProfile(userId: string): Promise<UserProfile> {
    const response = await apiClient.get<ApiSuccessResponse<UserProfile>>(
      apiEndpoints.users.profile(userId)
    );
    return response.data;
  }

  static async getUserStats(userId: string): Promise<UserStats> {
    const response = await apiClient.get<ApiSuccessResponse<UserStats>>(
      apiEndpoints.users.stats(userId)
    );
    return response.data;
  }

  static async getUserPreferences(userId: string): Promise<UserPreferences> {
    const response = await apiClient.get<ApiSuccessResponse<UserPreferences>>(
      apiEndpoints.users.preferences(userId)
    );
    return response.data;
  }

  static async updateUserProfile(
    userId: string, 
    updates: Partial<UserProfile>
  ): Promise<UserProfile> {
    const response = await apiClient.patch<ApiSuccessResponse<UserProfile>>(
      apiEndpoints.users.updateProfile(userId),
      updates
    );
    return response.data;
  }

  static async updateUserPreferences(
    userId: string, 
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    const response = await apiClient.patch<ApiSuccessResponse<UserPreferences>>(
      apiEndpoints.users.updatePreferences(userId),
      preferences
    );
    return response.data;
  }
}