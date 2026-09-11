import { Database } from "../../types/supabase";

export type MateParticipantInsert =
  Database["public"]["Tables"]["mate_posts"]["Insert"];

export type MateParticipantUpdate =
  Database["public"]["Tables"]["mate_posts"]["Update"];

export type MateParticipantRow =
  Database["public"]["Tables"]["mate_participants"]["Row"];
