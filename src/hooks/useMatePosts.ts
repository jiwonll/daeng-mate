"use client";

import { getMatePosts } from "@/services/mate-post";
import { useQuery } from "@tanstack/react-query";

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
