import { Profile } from "@/types/profile";
import { supabase } from "@/lib/supabase/client";
import { ProfileUpdate } from "@/types/profile";
import { AuthCredentials } from "@/types/common";

export async function getCurrentProfile(
  userId: string
): Promise<Profile | null> {
  if (!userId) {
    return null;
  }
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (profileError) {
    console.error("Profile fetch error:", profileError.message);
    return null;
  }

  return profile;
}

export async function updateProfile({
  userId,
  profileUpdate,
}: {
  userId: string;
  profileUpdate: ProfileUpdate;
}) {
  const { error } = await supabase
    .from("profiles")
    .update(profileUpdate)
    .eq("id", userId)
    .select("*");
  if (error) {
    console.error("Profile update error:", error.message);
    return null;
  }
}
