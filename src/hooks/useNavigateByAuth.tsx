"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function useNavigateByAuth() {
  const router = useRouter();

  const navigateByAuth = () => {
    console.log("navigateByAuth 실행!");
    console.log("1. navigateByAuth");

    const result = supabase.auth.getUser();

    console.log("2. getUser 호출함", result);

    result.then(({ data: { user }, error }) => {
      console.log("3. then 실행");
      console.log("user:", user);
      console.log("error:", error);

      if (user) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    });
  };
  return navigateByAuth;
}
