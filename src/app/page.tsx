import { supabase } from "@/lib/supabase";
import landingHeader from "@/components/landing/LandingHeader";
import landingMain from "@/components/landing/LandingMain";
import landingFooter from "@/components/landing/LandingFooter";

export default async function Home() {
  const { data, error } = await supabase.from("profiles").select("*");
}
