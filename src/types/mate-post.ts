import { Database } from "../../types/supabase";

export type MatePostInsert =
  Database["public"]["Tables"]["mate_posts"]["Insert"];
export type MatePostUpdate =
  Database["public"]["Tables"]["mate_posts"]["Update"];

export type MatePostRow = Database["public"]["Tables"]["mate_posts"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type DogRow = Database["public"]["Tables"]["dogs"]["Row"];

export type ProfileSummary = Pick<ProfileRow, "id" | "nickname" | "gender">;

export type MatePostWithDog = MatePostRow & {
  profiles:
    | (ProfileSummary & {
        dogs: DogRow | null;
      })
    | null;
};

export type MatePostStatus = "recruiting" | "closed" | "completed";
