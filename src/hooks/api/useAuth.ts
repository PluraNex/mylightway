import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys, apiEndpoints } from '@/lib/api/config';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserProfile,
  ApiSuccessResponse,
} from '@/types/api';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
      const response = await apiClient.post<ApiSuccessResponse<LoginResponse>>(
        apiEndpoints.auth.login,
        data
      );
      return response.data;
    },
    onSuccess: data => {
      apiClient.setAuthToken(data.token);
      queryClient.setQueryData(queryKeys.auth.profile(), data.user);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('refresh_token', data.refreshToken);
    },
    onError: () => {
      apiClient.setAuthToken(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest): Promise<LoginResponse> => {
      const response = await apiClient.post<ApiSuccessResponse<LoginResponse>>(
        apiEndpoints.auth.register,
        data
      );
      return response.data;
    },
    onSuccess: data => {
      apiClient.setAuthToken(data.token);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('refresh_token', data.refreshToken);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      try {
        await apiClient.post(apiEndpoints.auth.logout);
      } catch {
        // Continue with logout even if API call fails
      }
    },
    onSuccess: () => {
      apiClient.setAuthToken(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      queryClient.clear();
    },
    onSettled: () => {
      // Ensure cleanup happens regardless of API call result
      apiClient.setAuthToken(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      queryClient.clear();
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: queryKeys.auth.profile(),
    queryFn: async (): Promise<UserProfile> => {
      const response = await apiClient.get<ApiSuccessResponse<UserProfile>>(
        apiEndpoints.auth.profile
      );
      return response.data;
    },
    enabled: !!localStorage.getItem('auth_token'),
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<LoginResponse> => {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<ApiSuccessResponse<LoginResponse>>(
        apiEndpoints.auth.refresh,
        { refreshToken }
      );
      return response.data;
    },
    onSuccess: data => {
      apiClient.setAuthToken(data.token);
      queryClient.setQueryData(queryKeys.auth.profile(), data.user);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('refresh_token', data.refreshToken);
    },
    onError: () => {
      apiClient.setAuthToken(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      queryClient.clear();
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string): Promise<void> => {
      await apiClient.post<ApiSuccessResponse<void>>(
        apiEndpoints.auth.forgotPassword,
        { email }
      );
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: {
      token: string;
      password: string;
    }): Promise<void> => {
      await apiClient.post<ApiSuccessResponse<void>>(
        apiEndpoints.auth.resetPassword,
        data
      );
    },
  });
};
