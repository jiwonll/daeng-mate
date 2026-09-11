"use client";

import {
  getMateParticipate,
  updateMateParticipate,
  deleteMateParticipate,
} from "@/services/mate-participants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

export function useMateParticipate() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["mateParticipate", user?.id],
    queryFn: () => getMateParticipate(user?.id || ""),
    enabled: !!user?.id,
  });

  const updateMutation = useMutation({
    mutationFn: updateMateParticipate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mateParticipate", user?.id],
      });
      toast.success("참여 신청이 완료되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`참여 신청 중 오류가 발생했습니다: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMateParticipate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mateParticipate", user?.id],
      });
      toast.success("참여 취소가 완료되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`참여 취소 중 오류가 발생했습니다: ${error.message}`);
    },
  });
  return {
    participations: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    updateParticipate: updateMutation.mutate,
    deleteParticipate: deleteMutation.mutate,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    query,
    updateMutation,
    deleteMutation,
    user,
  };
}
