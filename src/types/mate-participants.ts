import { Database } from "../../types/supabase";

export type MateParticipantInsert =
  Database["public"]["Tables"]["mate_posts"]["Insert"];

export type MateParticipantUpdate =
  Database["public"]["Tables"]["mate_posts"]["Update"];

export type MateParticipantRow =
  Database["public"]["Tables"]["mate_participants"]["Row"];

export type ParticipateStatus =
  "pending" | "accepted" | "rejected" | "canceled";
export type ParticipantProfile = {
  nickname: string | null;
  region: string | null;
  gender: string | null;
  temperature: number | null;
  dogs: {
    name: string;
    photo_url: string | null;
    breed: string | null;
  } | null;
};

export type ParticipantMatePost = {
  id: string;
  title: string;
  user_id: string;
  meeting_place: string;
  meeting_time: string;
};

export type ReceivedMateParticipantRow = {
  id: string;
  post_id: string;
  user_id: string;
  status: ParticipateStatus;
  created_at: string;
  mate_posts: ParticipantMatePost;
  profiles: ParticipantProfile | null;
};

export type SentMateParticipantRow = MateParticipantRow & {
  mate_posts: {
    id: string;
    title: string;
    user_id: string;
    profiles: ParticipantProfile | null;
    meeting_place: string;
    meeting_time: string;
  } | null;
};
