import { MatePostWithDog } from "@/types/mate-post";
import { supabase } from "@/lib/supabase/client";

export async function getMatePosts(): Promise<MatePostWithDog[] | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const { data: mate_posts, error } = await supabase.from("mate_posts").select(`
      *,
      profiles:profiles!user_id (
        id,
        nickname,
        dogs!dogs_user_id_fkey (
          name,
          photo_url,
          breed,
          age
        )
      )
    `);

  return mate_posts as unknown as MatePostWithDog[] | null;
}
