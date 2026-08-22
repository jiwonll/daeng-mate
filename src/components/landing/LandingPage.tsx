import LandingHeader from "@/components/landing/LandingHeader";
import LandingMain from "@/components/landing/LandingMain";
import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <LandingMain />
      </main>
      <LandingFooter />
    </div>
  );
}
