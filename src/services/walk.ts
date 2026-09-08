import { Database } from "../../types/supabase";
import { supabase } from "@/lib/supabase/client";

type Walk = Database["public"]["Tables"]["walks"]["Row"];

export async function getWalk(): Promise<Walk[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return [];
  }

  const { data: walk, error: walkError } = await supabase
    .from("walks")
    .select("*")
    .eq("user_id", user.id);

  if (walkError) {
    console.error("Walks fetch error:", walkError.message);
    return [];
  }

  return walk ?? [];
}
