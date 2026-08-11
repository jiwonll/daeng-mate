"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function useNavigateByAuth() {
  const router = useRouter();

  const navigateByAuth = (path: string) => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    });
  };

  return navigateByAuth;
}
