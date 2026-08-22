"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function useAuthActions() {
  const router = useRouter();

  const navigateByAuth = () => {
    const result = supabase.auth.getUser();

    result.then(({ data: { user } }) => {
      if (user) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    });
  };

  const loginWithKakao = () => {};

  const loginWithGoogle = () => {};

  return {
    navigateByAuth,
    loginWithKakao,
    loginWithGoogle,
  };
}
