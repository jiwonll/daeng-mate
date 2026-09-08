import { Database } from "../../types/supabase";

export type Dog = Database["public"]["Tables"]["dogs"]["Row"];
