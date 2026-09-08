"use client";

import Link from "next/link";
import { ChevronRight, PawPrint, MapPin, Clock } from "lucide-react";
import useWalk from "@/hooks/useWalks";
import { MOCK_WALKS } from "@/mocks/walks";

export default function WalkCard() {
  const { walks, isLoading, isError } = useWalk();

  const recentWalks = MOCK_WALKS.slice(0, 4);

  return (
    <div>
      <Link className="flex items-center gap-1 mb-5 group w-fit" href={"/walk"}>
        <h3 className="font-semibold text-xl text-foreground">최근 산책기록</h3>
        <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
      </Link>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {recentWalks.map((walk) => {
          const distanceKm = ((walk.distance || 0) / 1000).toFixed(1);
          const durationMinutes = Math.floor((walk.duration || 0) / 60);
          const walkDate = walk.started_at
            ? new Date(walk.started_at).toLocaleDateString("ko-KR", {
                month: "long",
                day: "numeric",
                weekday: "short",
              })
            : "날짜 정보 없음";

          const startLoc = walk.start_location || "시작 위치 정보 없음";
          const endLoc = walk.end_location || "종료 위치 정보 없음";

          return (
            <div
              key={walk.id}
              className="flex-shrink-0 w-[280px] p-5 border border-border rounded-2xl bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary transition-all snap-start flex flex-col justify-between space-y-4 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-primary-foreground bg-primary px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <PawPrint className="w-3.5 h-3.5" /> 산책 완료
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {walkDate}
                </span>
              </div>

              <div className="p-3 bg-secondary/50 rounded-xl border border-border/60 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-muted-foreground font-medium shrink-0">
                    출발
                  </span>
                  <span className="text-foreground font-semibold truncate">
                    {startLoc}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-destructive shrink-0" />
                  <span className="text-muted-foreground font-medium shrink-0">
                    도착
                  </span>
                  <span className="text-foreground font-semibold truncate">
                    {endLoc}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      이동 거리
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {distanceKm} km
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      소요 시간
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {durationMinutes} 분
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
