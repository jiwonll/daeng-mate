import { supabase } from "@/lib/supabase/client";
import { SentMateParticipantRow } from "@/types/mate-participants";
import { ReceivedMateParticipantRow } from "@/types/mate-participants";

export async function getMateParticipate(
  userId?: string
): Promise<SentMateParticipantRow[]> {
  if (!userId) {
    return [];
  }
  const { data, error } = await supabase
    .from("mate_participants")
    .select(
      `*,mate_posts (     
      id,      
    title,
    user_id,
    meeting_place,
    meeting_time,
    profiles!user_id (          
nickname, region, gender, temperature,
    dogs (
            name,
            breed,
            photo_url
    ))


  )`
    )
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
    .update({ status: "canceled" })
    .eq("user_id", userId)
    .eq("post_id", postId);
  if (error) {
    throw new Error(error.message);
  }
}

export async function getReceivedMateParticipate(
  userId?: string
): Promise<ReceivedMateParticipantRow[]> {
  const { data, error } = await supabase
    .from("mate_participants")
    .select(
      `
      *,
      mate_posts!inner (
        id,
        title,
        user_id,
        meeting_place,
        meeting_time
      ),
        profiles (nickname, region, gender, temperature
       
      )
    `
    )
    .eq("mate_posts.user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
}

export async function updateParticipateStatus({
  userId,
  postId,
  status,
}: {
  userId: string;
  postId: string;
  status: "accepted" | "rejected";
}) {
  const { data, error } = await supabase
    .from("mate_participants")
    .update({ status })
    .eq("user_id", userId)
    .eq("post_id", postId)
    .select();

  console.log("업데이트 결과:", data);
  console.log("업데이트 에러:", error);
  if (error) {
    throw new Error(error.message);
  }
}
