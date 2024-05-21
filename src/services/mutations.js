import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentPost, createPost, deletePost, updatePost } from "./api";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId) => await deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, data }) => updatePost({ postId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useCreateCommentPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, comment }) => {
      return await createCommentPost({ postId, comment });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts", variables.postId] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
