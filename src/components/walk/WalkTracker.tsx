"use client";

import { useEffect, useMemo, useState } from "react";
import { useMateParticipate } from "@/hooks/useMateParticipate";
import { useUser } from "@/hooks/useUser";
import { useWalkTracker } from "@/hooks/useWalkTracker";
import KakaoMap from "@/components/walk/KakaoMap";
import PersonalWalkCard from "@/components/walk/PersonalWalkCard";
import WalkPostList from "@/components/walk/WalkPostList";
import WalkStatsPanel from "@/components/walk/WalkStatsPanel";
import ApplicantList from "@/components/walk/ApplicantList";
import { formatMeetingTime, formatRemaining } from "@/utils/date";
import { START_EARLY_MINUTES, groupWalkPosts } from "@/utils/walk";
import { Button } from "../ui/button";

export default function WalkTracker() {
  const { user } = useUser();
  const userId = user?.id ?? "";

  const {
    receivedParticipations,
    isReceivedLoading,
    receivedQuery,
    updateAttendance,
    isAttendanceUpdating,
  } = useMateParticipate(userId);

  const {
    isWalking,
    walkingPostId,
    isTracking,
    isSaving,
    seconds,
    distance,
    route,
    start,
    stop,
  } = useWalkTracker(userId);

  const [now, setNow] = useState(() => Date.now());
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const posts = useMemo(
    () => groupWalkPosts(receivedParticipations, now, walkingPostId),
    [receivedParticipations, now, walkingPostId]
  );

  if (!user) return null;

  const selected = posts.find((p) => p.id === selectedId) ?? posts[0];

  const selectedStartMs = selected
    ? new Date(selected.startAt).getTime() - START_EARLY_MINUTES * 60_000
    : 0;

  const timeReached = now >= selectedStartMs;
  const isPersonalWalking = isWalking && walkingPostId === null;
  const isWalkingHere =
    !!selected && isWalking && walkingPostId === selected.id;
  const anotherWalking = isWalking && !isWalkingHere;
  const canStart = !!selected && timeReached && !isWalking;

  const attendedCount = selected
    ? selected.applicants.filter((a) => a.attended).length
    : 0;

  return (
    <main className="mx-auto max-w-7xl p-4 lg:p-6">
      <h1 className="mb-6 font-jua text-2xl">산책 하기</h1>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <section className="min-w-0 space-y-6">
          <PersonalWalkCard
            isWalking={isWalking}
            isPersonal={isPersonalWalking}
            isTracking={isTracking}
            isSaving={isSaving}
            seconds={seconds}
            distance={distance}
            onStart={() => start(null)}
            onStop={stop}
          />

          <h2 className="font-jua text-xl">내 산책 모집글</h2>

          {isReceivedLoading ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              불러오는 중이에요...
            </p>
          ) : receivedQuery.isError ? (
            <p className="rounded-2xl bg-destructive/10 p-4 text-center text-sm text-destructive">
              목록을 불러오지 못했어요. 새로고침 후 다시 시도해 주세요.
            </p>
          ) : !selected ? (
            <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              진행할 모집 산책이 없어요. 모집글에 신청이 들어오면 여기에 보여요.
            </p>
          ) : (
            <>
              <WalkPostList
                posts={posts}
                selectedId={selected.id}
                walkingPostId={walkingPostId}
                now={now}
                onSelect={setSelectedId}
              />

              <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-card-foreground">
                    {selected.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    📍 {selected.place}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    🕒{" "}
                    {formatMeetingTime(selected.startAt, { hour: "numeric" })}
                  </p>
                </div>

                {isWalkingHere ? (
                  <WalkStatsPanel
                    distance={distance}
                    seconds={seconds}
                    isTracking={isTracking}
                    isSaving={isSaving}
                    onStop={stop}
                  />
                ) : (
                  <div className="space-y-2">
                    <Button
                      type="button"
                      disabled={!canStart}
                      onClick={() => start(selected.id)}
                      size="lg"
                      className="w-full text-md"
                    >
                      🐾 산책 시작하기
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      {anotherWalking
                        ? "다른 산책이 진행 중이에요."
                        : timeReached
                          ? `참가 확인된 강아지 ${attendedCount}마리와 출발할 수 있어요.`
                          : `시작 시간이 되면 버튼이 열려요. (${formatRemaining(
                              selectedStartMs - now
                            )} 남음)`}
                    </p>
                  </div>
                )}

                <ApplicantList
                  applicants={selected.applicants}
                  pendingCount={selected.pendingCount}
                  disabled={isWalkingHere || isAttendanceUpdating}
                  onToggleAttendance={(targetUserId, attended) =>
                    updateAttendance({
                      userId: targetUserId,
                      postId: selected.id,
                      attended,
                    })
                  }
                />
              </section>
            </>
          )}
        </section>

        <section className="lg:sticky lg:top-6">
          <div className="rounded-2xl border border-border bg-card p-3 shadow-sm">
            <div className="mb-3 flex items-center justify-between px-2">
              <h2 className="font-bold text-card-foreground">산책 지도</h2>
              <span className="text-xs text-muted-foreground">
                {isTracking ? "● 실시간 위치" : "산책 시작 후 위치 표시"}
              </span>
            </div>

            <KakaoMap route={route} isTracking={isTracking} />
          </div>
        </section>
      </div>
    </main>
  );
}
