import { formatElapsed } from "@/utils/date";
import { Button } from "../ui/button";

type Props = {
  distance: number;
  seconds: number;
  isTracking: boolean;
  isSaving: boolean;
  onStop: () => void;
};

export default function WalkStatsPanel({
  distance,
  seconds,
  isTracking,
  isSaving,
  onStop,
}: Props) {
  return (
    <div className="space-y-4 rounded-2xl border bg-card p-5 text-center shadow-md">
      <div className="grid grid-cols-2 divide-x border-b pb-4">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">산책 거리</p>
          <p className="text-2xl font-black text-card-foreground">
            {(distance / 1000).toFixed(2)}{" "}
            <span className="text-sm font-medium">km</span>
          </p>
        </div>

        <div>
          <p className="mb-1 text-xs text-muted-foreground">경과 시간</p>
          <p className="text-2xl font-black text-primary">
            {formatElapsed(seconds)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            isTracking ? "animate-pulse bg-primary" : "bg-muted-foreground/40"
          }`}
        />
        <span>
          {isTracking
            ? "GPS 실시간 경로 기록 중..."
            : "기록이 멈췄어요. 저장을 다시 시도해 주세요."}
        </span>
      </div>

      <Button
        type="button"
        onClick={onStop}
        disabled={isSaving}
        className="w-full bg-destructive text-lg"
        size="lg"
      >
        {isSaving
          ? "저장 중..."
          : isTracking
            ? "산책 종료"
            : "기록 다시 저장하기"}
      </Button>
    </div>
  );
}
