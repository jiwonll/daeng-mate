"use client";

import { signOut } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: handleLogout, isPending } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast.success("로그아웃 되었습니다.");
      queryClient.clear();
      router.replace("/login");
      router.refresh();
    },
    onError: (error) => {
      console.error("Logout Error:", error);
      toast.error(
        "로그아웃 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    },
  });

  return { handleLogout, isPending };
}
