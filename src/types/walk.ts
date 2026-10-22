import { Database } from "../../types/supabase";

export type WalkRow = Database["public"]["Tables"]["walks"]["Row"];
export type WalkInsert = Database["public"]["Tables"]["walks"]["Insert"];
export type WalkUpdate = Database["public"]["Tables"]["walks"]["Update"];

export type LocationPoint = {
  lat: number;
  lng: number;
  timestamp: number;
};

export type DogSummary = {
  name: string;
  breed: string | null;
  photo_url: string | null;
};

export type Applicant = {
  userId: string;
  nickname: string;
  dogNames: string;
  breeds: string;
  photoUrl: string | null;
  attended: boolean;
};

export type WalkPost = {
  id: string;
  title: string;
  place: string;
  startAt: string;
  pendingCount: number;
  applicants: Applicant[];
};
