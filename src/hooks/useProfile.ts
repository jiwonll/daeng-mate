import { getCurrentProfile, updateProfile } from "@/services/users";
import { getEmail, updateEmail, updatePassword } from "@/services/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/constants/queryKeys";

export function useGetProfile(userId?: string) {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getCurrentProfile(userId!),
    enabled: !!userId,
  });
  return { profile, isLoading };
}

export function useUpdateProfile(userId: string) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("수정 완료되었습니다.");
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.profile.get(userId),
        });
      }
    },
    onError: () => {
      toast.error("수정 되지않았습니다.");
    },
  });
  return { mutate, isPending };
}

export function useUpdatePassword() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("수정 완료되었습니다.");
    },

    onError: (error: Error) => {
      if (error.message === "UPDATE_PASSWORD_FAILED") {
        toast.error("새 비밀번호 변경에 실패했습니다. ");
      } else {
        toast.error("비밀번호 변경 중 알 수 없는 에러가 발생했습니다.");
      }

      console.error("[비밀번호 변경 에러]:", error.message);
    },
  });
  return { mutateAsync, isPending };
}

export function useGetEmail() {
  const { data, isPending } = useQuery({
    queryKey: queryKeys.profile.email,
    queryFn: () => getEmail(),
  });
  return { data, isPending };
}

export function useUpdateEmail() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateEmail,
    onSuccess: () => {
      toast.success("이메일이 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.email });
    },
    onError: () => {
      toast.error("이메일이 변경 되지않았습니다.");
    },
  });
  return { mutateAsync, isPending };
}
