"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function useAuthActions() {
  const router = useRouter();

  const loginWithKakao = () => {};

  const loginWithGoogle = () => {};

  return {
    loginWithKakao,
    loginWithGoogle,
  };
}
