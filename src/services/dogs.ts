import { Dog } from "@/types/database";
import { supabase } from "@/lib/supabase/client";

export async function getDog(): Promise<Dog | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return null;
  }
  const { data: dogs, error: dogError } = await supabase
    .from("dogs")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (dogError) {
    return null;
  }

  return dogs;
}
