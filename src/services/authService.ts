import { apiClient } from '@/lib/api/client';
import { apiEndpoints } from '@/lib/api/config';
import { env } from '@/lib/env';
import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest,
  UserProfile,
  ApiSuccessResponse 
} from '@/types/api';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<ApiSuccessResponse<LoginResponse>>(
      apiEndpoints.auth.login,
      credentials
    );
    
    const { token, refreshToken } = response.data;
    this.setTokens(token, refreshToken);
    apiClient.setAuthToken(token);
    
    return response.data;
  }

  static async register(userData: RegisterRequest): Promise<LoginResponse> {
    const response = await apiClient.post<ApiSuccessResponse<LoginResponse>>(
      apiEndpoints.auth.register,
      userData
    );
    
    const { token, refreshToken } = response.data;
    this.setTokens(token, refreshToken);
    apiClient.setAuthToken(token);
    
    return response.data;
  }

  static async logout(): Promise<void> {
    try {
      await apiClient.post(apiEndpoints.auth.logout);
    } catch {
      // Continue with logout even if API call fails
    } finally {
      this.clearTokens();
      apiClient.setAuthToken(null);
    }
  }

  static async refreshToken(): Promise<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<ApiSuccessResponse<LoginResponse>>(
      apiEndpoints.auth.refresh,
      { refreshToken }
    );
    
    const { token: newToken, refreshToken: newRefreshToken } = response.data;
    this.setTokens(newToken, newRefreshToken);
    apiClient.setAuthToken(newToken);
    
    return response.data;
  }

  static async getCurrentUser(): Promise<UserProfile> {
    const response = await apiClient.get<ApiSuccessResponse<UserProfile>>(
      apiEndpoints.auth.profile
    );
    return response.data;
  }

  static async forgotPassword(email: string): Promise<void> {
    await apiClient.post<ApiSuccessResponse<void>>(
      apiEndpoints.auth.forgotPassword,
      { email }
    );
  }

  static async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post<ApiSuccessResponse<void>>(
      apiEndpoints.auth.resetPassword,
      { token, password }
    );
  }

  static initializeAuth(): void {
    const token = this.getAuthToken();
    if (token) {
      apiClient.setAuthToken(token);
    }
  }

  static isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  static getAuthToken(): string | null {
    return localStorage.getItem(env.TOKEN_STORAGE_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(env.REFRESH_TOKEN_STORAGE_KEY);
  }

  private static setTokens(authToken: string, refreshToken: string): void {
    localStorage.setItem(env.TOKEN_STORAGE_KEY, authToken);
    localStorage.setItem(env.REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  }

  private static clearTokens(): void {
    localStorage.removeItem(env.TOKEN_STORAGE_KEY);
    localStorage.removeItem(env.REFRESH_TOKEN_STORAGE_KEY);
  }
}