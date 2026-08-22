"use client";

import LandingPage from "@/components/landing/LandingPage";
import MainPage from "@/components/main/MainPage";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user && !error);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  if (isLoggedIn) {
    return <MainPage />;
  }

  return <LandingPage />;
}
