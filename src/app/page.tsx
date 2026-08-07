import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase.from("profiles").select("*");
}
