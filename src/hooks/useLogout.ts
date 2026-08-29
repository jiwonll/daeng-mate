"use client";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useLogout() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const handleLogout = async () => {
    try {
      if (isPending) return;
      setIsPending(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("로그아웃을 실패했습니다.");
      } else {
        toast.success("로그아웃 되었습니다.");
        router.replace("/login");
        router.refresh();
      }
    } catch (error) {
      toast.error("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsPending(false);
    }
  };
  return { handleLogout, isPending };
}
