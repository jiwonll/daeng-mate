"use client";

import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function useAuthActions() {
  const loginWithKakao = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        toast.error("로그인 실패");
        return;
      }
    } catch (error) {
      toast.error("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return {
    loginWithKakao,
  };
}
