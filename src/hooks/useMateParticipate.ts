"use client";

import {
  getMateParticipate,
  updateMateParticipate,
  deleteMateParticipate,
  getReceivedMateParticipate,
  updateParticipateStatus,
} from "@/services/mate-participants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMateParticipate(userId: string) {
  const queryClient = useQueryClient();

  const sentQuery = useQuery({
    queryKey: ["mateParticipate", "sent", userId],
    queryFn: () => getMateParticipate(userId),
    enabled: !!userId,
  });

  const updateMutation = useMutation({
    mutationFn: updateMateParticipate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mateParticipate"],
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
        queryKey: ["mateParticipate"],
      });
      toast.success("참여 취소가 완료되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`참여 취소 중 오류가 발생했습니다: ${error.message}`);
    },
  });

  const receivedQuery = useQuery({
    queryKey: ["mateParticipate", "received", userId],
    queryFn: () => getReceivedMateParticipate(userId),
    enabled: !!userId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateParticipateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mateParticipate"],
      });
      toast.success("처리가 완료되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`승인/거절 처리 중 오류가 발생했습니다: ${error.message}`);
    },
  });
  return {
    sentParticipations: sentQuery.data ?? [],
    isSentLoading: sentQuery.isLoading,
    isSentError: sentQuery.isError,
    updateParticipate: updateMutation.mutate,
    deleteParticipate: deleteMutation.mutate,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    sentQuery,
    updateMutation,
    deleteMutation,
    receivedQuery,
    receivedParticipations: receivedQuery.data ?? [],
    isReceivedLoading: receivedQuery.isLoading,
    updateParticipateStatus: updateStatusMutation.mutate,
  };
}
