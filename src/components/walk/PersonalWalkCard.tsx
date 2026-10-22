import WalkStatsPanel from "./WalkStatsPanel";
import { Button } from "@/components/ui/button";

type Props = {
  isWalking: boolean;
  isPersonal: boolean;
  isTracking: boolean;
  isSaving: boolean;
  seconds: number;
  distance: number;
  onStart: () => void;
  onStop: () => void;
};

export default function PersonalWalkCard({
  isWalking,
  isPersonal,
  isTracking,
  isSaving,
  seconds,
  distance,
  onStart,
  onStop,
}: Props) {
  if (isPersonal) {
    return (
      <WalkStatsPanel
        distance={distance}
        seconds={seconds}
        isTracking={isTracking}
        isSaving={isSaving}
        onStop={onStop}
      />
    );
  }

  const blocked = isWalking;

  return (
    <section className="space-y-2 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="text-lg font-bold text-card-foreground">개인 산책</h2>
      <p className="text-sm text-muted-foreground mb-3">
        모집 없이 나만의 산책을 기록해요.
      </p>

      <Button
        type="button"
        disabled={blocked}
        onClick={onStart}
        className="w-full text-md"
        size="lg"
      >
        🐾 개인 산책 시작
      </Button>

      {blocked && (
        <p className="text-center text-xs text-muted-foreground">
          모집글 산책이 진행 중이에요.
        </p>
      )}
    </section>
  );
}
