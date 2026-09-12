"use client";

import { getMatePosts, createMatePost } from "@/services/mate-post";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useMatePosts() {
  const {
    data: matePosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["matePosts"],
    queryFn: getMatePosts,
  });

  return { matePosts, isLoading, isError };
}

export function useCreateMatePost() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, data } = useMutation({
    mutationFn: createMatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matePosts"] });
    },
  });
  return {
    createPost: mutate,
    createPostAsync: mutateAsync,
    isPending,
    isError,
    data,
  };
}
