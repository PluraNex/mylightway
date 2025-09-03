import { apiClient } from '@/lib/api/client';
import { apiEndpoints } from '@/lib/api/config';
import type {
  LearningPath,
  Lesson,
  UserProgress,
  PaginatedResponse,
  ApiSuccessResponse,
} from '@/types/api';

export class LearningService {
  static async getLearningPaths(params?: {
    category?: string;
    difficulty?: string;
    ageGroup?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<LearningPath>> {
    const response = await apiClient.get<
      ApiSuccessResponse<PaginatedResponse<LearningPath>>
    >(apiEndpoints.learningPaths.list, params);
    return response.data;
  }

  static async getLearningPath(id: string): Promise<LearningPath> {
    const response = await apiClient.get<ApiSuccessResponse<LearningPath>>(
      apiEndpoints.learningPaths.detail(id)
    );
    return response.data;
  }

  static async getLearningPathLessons(pathId: string): Promise<Lesson[]> {
    const response = await apiClient.get<ApiSuccessResponse<Lesson[]>>(
      apiEndpoints.learningPaths.lessons(pathId)
    );
    return response.data;
  }

  static async enrollInPath(pathId: string): Promise<UserProgress> {
    const response = await apiClient.post<ApiSuccessResponse<UserProgress>>(
      apiEndpoints.learningPaths.enroll(pathId)
    );
    return response.data;
  }

  static async getPathProgress(
    pathId: string,
    userId?: string
  ): Promise<UserProgress[]> {
    const response = await apiClient.get<ApiSuccessResponse<UserProgress[]>>(
      apiEndpoints.learningPaths.progress(pathId),
      userId ? { userId } : undefined
    );
    return response.data;
  }

  static async getLesson(id: string): Promise<Lesson> {
    const response = await apiClient.get<ApiSuccessResponse<Lesson>>(
      apiEndpoints.lessons.detail(id)
    );
    return response.data;
  }

  static async getLessonContent(id: string): Promise<Lesson> {
    const response = await apiClient.get<ApiSuccessResponse<Lesson>>(
      apiEndpoints.lessons.content(id)
    );
    return response.data;
  }

  static async startLesson(
    lessonId: string,
    pathId?: string
  ): Promise<UserProgress> {
    const response = await apiClient.post<ApiSuccessResponse<UserProgress>>(
      apiEndpoints.lessons.progress(lessonId),
      { action: 'start', pathId }
    );
    return response.data;
  }

  static async updateLessonProgress(
    lessonId: string,
    progress: number,
    timeSpent: number,
    data?: Record<string, any>
  ): Promise<UserProgress> {
    const response = await apiClient.patch<ApiSuccessResponse<UserProgress>>(
      apiEndpoints.lessons.progress(lessonId),
      { progress, timeSpent, data }
    );
    return response.data;
  }

  static async completeLesson(
    lessonId: string,
    data: {
      score?: number;
      timeSpent: number;
      quizAnswers?: Record<string, any>;
      pathId?: string;
    }
  ): Promise<UserProgress> {
    const response = await apiClient.post<ApiSuccessResponse<UserProgress>>(
      apiEndpoints.lessons.complete(lessonId),
      data
    );
    return response.data;
  }

  static async getUserProgress(userId?: string): Promise<UserProgress[]> {
    const response = await apiClient.get<ApiSuccessResponse<UserProgress[]>>(
      apiEndpoints.progress.user,
      userId ? { userId } : undefined
    );
    return response.data;
  }

  static async searchLearningPaths(
    query: string,
    limit = 10
  ): Promise<LearningPath[]> {
    const response = await this.getLearningPaths({ search: query, limit });
    return response.data;
  }
}
