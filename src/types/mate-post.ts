import { Database } from "../../types/supabase";

export type MatePostRow = Database["public"]["Tables"]["mate_posts"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type DogRow = Database["public"]["Tables"]["dogs"]["Row"];
