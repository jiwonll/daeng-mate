"use client";

import { getDog, updateDog } from "@/services/dogs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DogUpdate } from "@/types/dogs";
import { queryKeys } from "@/constants/queryKeys";

export function useGetDog(userId?: string) {
  const { data: dog, isLoading } = useQuery({
    queryKey: queryKeys.dog.byUser(userId),
    queryFn: () => getDog(userId!),
    enabled: !!userId,
  });
  return { dog, isLoading };
}

export function useUpdateDog() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ dogId, updates }: { dogId: string; updates: DogUpdate }) =>
      updateDog(dogId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dog.all });
    },
  });
  return {
    mutate,
    isPending,
  };
}
