import { Profile } from "@/types/profile";
import { supabase } from "@/lib/supabase/client";

export async function getCurrentProfile(): Promise<Profile | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return null;
  }
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  if (profileError) {
    console.error("Profile fetch error:", profileError.message);
    return null;
  }

  return profile;
}
