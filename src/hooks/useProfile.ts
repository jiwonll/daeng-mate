import { getCurrentProfile, updateProfile } from "@/services/users";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetProfile(userId?: string) {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getCurrentProfile(userId!),
    enabled: !!userId,
  });
  return { profile, isLoading };
}

export function useUpdateProfile(userId: string) {
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("수정 완료되었습니다.");
    },
    onError: () => {
      toast.error("수정 되지않았습니다.");
    },
  });
  return { mutate, isPending };
}
