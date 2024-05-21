import { useQuery } from "@tanstack/react-query";

import { getAllPosts, getPost } from "./api";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getAllPosts(),
  });
};

export const usePost = (postId) => {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => await getPost(postId),
  });
};
