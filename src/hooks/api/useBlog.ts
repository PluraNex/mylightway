import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { queryKeys, apiEndpoints } from '@/lib/api/config';
import type {
  BlogPost,
  Comment,
  PaginatedResponse,
  ApiSuccessResponse,
} from '@/types/api';

interface BlogPostsParams {
  category?: string;
  author?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const useBlogPosts = (params?: BlogPostsParams) => {
  return useQuery({
    queryKey: queryKeys.blog.list(params),
    queryFn: async (): Promise<PaginatedResponse<BlogPost>> => {
      const response = await apiClient.get<
        ApiSuccessResponse<PaginatedResponse<BlogPost>>
      >(apiEndpoints.blog.list, params);
      return response.data;
    },
  });
};

export const useInfiniteBlogPosts = (
  params?: Omit<BlogPostsParams, 'page'>
) => {
  return useInfiniteQuery({
    queryKey: queryKeys.blog.list(params),
    queryFn: async ({
      pageParam = 1,
    }): Promise<PaginatedResponse<BlogPost>> => {
      const response = await apiClient.get<
        ApiSuccessResponse<PaginatedResponse<BlogPost>>
      >(apiEndpoints.blog.list, { ...params, page: pageParam });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const useBlogPost = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.blog.detail(slug),
    queryFn: async (): Promise<BlogPost> => {
      const response = await apiClient.get<ApiSuccessResponse<BlogPost>>(
        apiEndpoints.blog.detail(slug)
      );
      return response.data;
    },
    enabled: enabled && !!slug,
  });
};

export const useBlogComments = (postId: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.blog.comments(postId),
    queryFn: async (): Promise<Comment[]> => {
      const response = await apiClient.get<ApiSuccessResponse<Comment[]>>(
        apiEndpoints.blog.comments(postId)
      );
      return response.data;
    },
    enabled: enabled && !!postId,
  });
};

export const useLikeBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      postId: string
    ): Promise<{ liked: boolean; likesCount: number }> => {
      const response = await apiClient.post<
        ApiSuccessResponse<{ liked: boolean; likesCount: number }>
      >(apiEndpoints.blog.like(postId));
      return response.data;
    },
    onSuccess: (data, postId) => {
      // Update the blog post in cache
      queryClient.setQueryData(
        queryKeys.blog.detail(postId),
        (old: BlogPost | undefined) =>
          old ? { ...old, likesCount: data.likesCount } : old
      );

      // Invalidate blog list to update counts
      queryClient.invalidateQueries({ queryKey: queryKeys.blog.all() });
    },
  });
};

interface CreateCommentData {
  postId: string;
  content: string;
  parentId?: string;
}

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCommentData): Promise<Comment> => {
      const response = await apiClient.post<ApiSuccessResponse<Comment>>(
        apiEndpoints.blog.createComment(data.postId),
        { content: data.content, parentId: data.parentId }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate comments to refetch and include new comment
      queryClient.invalidateQueries({
        queryKey: queryKeys.blog.comments(variables.postId),
      });

      // Update blog post comment count
      queryClient.setQueryData(
        queryKeys.blog.detail(variables.postId),
        (old: BlogPost | undefined) =>
          old ? { ...old, commentsCount: old.commentsCount + 1 } : old
      );
    },
  });
};
