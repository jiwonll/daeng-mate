"use client";

import LandingPage from "@/components/landing/LandingPage";
import { supabase } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      const hasUser = !!user && !error;
      if (hasUser) {
        router.replace("/main");
      } else {
        setIsLoggedIn(false);
      }
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          router.replace("/main");
        } else {
          setIsLoggedIn(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (isLoggedIn === null || isLoggedIn === true) {
    return null;
  }

  return <LandingPage />;
}
