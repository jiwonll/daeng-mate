import { Dog, DogUpdate } from "@/types/dogs";
import { supabase } from "@/lib/supabase/client";

export async function getDog(userId: string): Promise<Dog | null> {
  if (!userId) {
    return null;
  }
  const { data: dogs, error: dogError } = await supabase
    .from("dogs")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (dogError) {
    return null;
  }

  return dogs;
}

export async function updateDog(dogId: string, updates: DogUpdate) {
  const { data, error } = await supabase
    .from("dogs")
    .update(updates)
    .eq("id", dogId)
    .select();

  if (error) {
    throw error;
  }

  return data;
}
