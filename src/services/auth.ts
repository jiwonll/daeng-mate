import { supabase } from "@/lib/supabase/client";
import { AuthCredentials } from "@/types/common";

export async function signUp({ email, password }: AuthCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signInWithPassword({ email, password }: AuthCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user;
}

export async function signInWithKakao() {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
}

export async function updatePassword({
  email,
  currentPassword,
  newPassword,
}: {
  email: string;
  currentPassword: string;
  newPassword: string;
}) {
  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  if (authError) {
    throw new Error("INVALID_CURRENT_PASSWORD");
  }
  const { data, error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (updateError) {
    throw new Error("UPDATE_PASSWORD_FAILED");
  }
  return data;
}

export async function getEmail() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  const email = user?.email;
  return email;
}

export async function updateEmail(newEmail: string) {
  const { data, error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) {
    console.log("=== 이메일 변경 에러 ===");
    console.log("message:", error.message);
    console.log("code:", error.code);
    console.log("status:", error.status);
    console.log("name:", error.name);
    console.log("전체:", error);
    throw error;
  }
  return { data };
}
