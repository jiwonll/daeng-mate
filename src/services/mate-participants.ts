import { supabase } from "@/lib/supabase/client";
import { MateParticipantRow } from "@/types/mate-participants";

export async function getMateParticipate(
  userId?: string
): Promise<MateParticipantRow[]> {
  if (!userId) {
    return [];
  }
  const { data, error } = await supabase
    .from("mate_participants")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
}

export async function updateMateParticipate({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}): Promise<void> {
  const { error } = await supabase.from("mate_participants").upsert(
    {
      user_id: userId,
      post_id: postId,
      status: "pending",
    },
    {
      onConflict: "user_id, post_id",
    }
  );
  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteMateParticipate({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}): Promise<void> {
  const { error } = await supabase
    .from("mate_participants")
    .delete()
    .eq("user_id", userId)
    .eq("post_id", postId);
  if (error) {
    throw new Error(error.message);
  }
}
