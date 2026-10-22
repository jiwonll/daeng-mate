import { WalkRow, WalkInsert } from "@/types/walk";
import { supabase } from "@/lib/supabase/client";

export async function getWalk(userId?: string): Promise<WalkRow[]> {
  if (!userId) {
    return [];
  }

  const { data: walk, error: walkError } = await supabase
    .from("walks")
    .select("*")
    .eq("user_id", userId)
    .order("started_at", { ascending: false });

  if (walkError) {
    console.error("Walks fetch error:", walkError.message);
    return [];
  }

  return walk ?? [];
}

export async function createWalk(walkData: WalkInsert): Promise<void> {
  const { error } = await supabase.from("walks").insert(walkData);

  if (error) {
    throw Error(error.message);
  }
}
