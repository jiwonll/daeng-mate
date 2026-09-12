import { MatePostWithDog } from "@/types/mate-post";
import { supabase } from "@/lib/supabase/client";
import { MatePostInsert } from "@/types/mate-post";
import { toast } from "sonner";

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

export async function createMatePost(MatePost: MatePostInsert) {
  const { data, error } = await supabase
    .from("mate_posts")
    .insert([MatePost])
    .select()
    .single();
  if (error) {
    console.error("모집글 등록 DB 에러", error.message);
    throw new Error(error.message);
  }
  return data;
}
