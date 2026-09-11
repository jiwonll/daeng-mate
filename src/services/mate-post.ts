import { MatePostWithDog } from "@/types/mate-post";
import { supabase } from "@/lib/supabase/client";

export async function getMatePosts(): Promise<MatePostWithDog[] | null> {
  const { data: mate_posts, error } = await supabase.from("mate_posts").select(`
      *,
      profiles:profiles!user_id (
        id,
        nickname,
        gender,
        dogs!dogs_user_id_fkey (
         *
        )
      )
    `);

  return mate_posts as unknown as MatePostWithDog[] | null;
}
