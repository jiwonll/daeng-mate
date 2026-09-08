import MyDogCard from "./MyDogCard";
import NearbyMateSection from "./NearbyMateSection";
import WalkCard from "./WalkCard";
import WeeklyWalkSummery from "./WeeklyWalkSummary";

export default function MainContent() {
  return (
    <div className="flex flex-col gap-6">
      <MyDogCard />
      <NearbyMateSection />
      <WalkCard />
      <WeeklyWalkSummery />
    </div>
  );
}
