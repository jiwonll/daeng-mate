"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function useNavigateByAuth() {
  const router = useRouter();

  const navigateByAuth = () => {
    const result = supabase.auth.getUser();

    console.log("2. getUser 호출함", result);

    result.then(({ data: { user } }) => {
      if (user) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    });
  };
  return navigateByAuth;
}
