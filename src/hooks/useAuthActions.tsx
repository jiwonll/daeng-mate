"use client";

import { supabase } from "@/lib/supabase/client";

export default function useAuthActions() {
  const loginWithKakao = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("카카오 로그인 실패", error);
    }
  };

  return {
    loginWithKakao,
  };
}
