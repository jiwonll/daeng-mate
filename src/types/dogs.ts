import { Database } from "../../types/supabase";

export type Dog = Database["public"]["Tables"]["dogs"]["Row"];
export type DogUpdate = Database["public"]["Tables"]["dogs"]["Update"];
