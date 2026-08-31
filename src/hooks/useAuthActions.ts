"use client";

import { signInWithKakao } from "@/services/auth";
import { toast } from "sonner";

export default function useAuthActions() {
  const loginWithKakao = async () => {
    try {
      await signInWithKakao();
    } catch (error) {
      console.error("Kakao Login Error:", error);
      toast.error("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return {
    loginWithKakao,
  };
}
