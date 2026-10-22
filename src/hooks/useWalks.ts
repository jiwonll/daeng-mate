"use client";

import { createWalk, getWalk } from "@/services/walk";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useWalks(userId?: string) {
  const {
    data: walks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["walk", userId],
    queryFn: () => getWalk(userId),
  });
  return { walks, isLoading, isError };
}

export function useCreateWalk() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createWalk,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["walk"] }),
    onError: (error) => {
      toast.error(
        `저장에 실패했어요: ${error instanceof Error ? error.message : "알 수 없는 오류"}`
      );
    },
  });

  return { createWalk: mutateAsync, isSaving: isPending };
}
