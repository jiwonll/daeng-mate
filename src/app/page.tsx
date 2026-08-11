import LandingHeader from "@/components/landing/LandingHeader";
import LandingMain from "@/components/landing/LandingMain";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main>
        <LandingMain />
      </main>
      <LandingFooter />
    </>
  );
}
