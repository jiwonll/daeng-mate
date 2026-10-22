import type { useMateParticipate } from "@/hooks/useMateParticipate";
import type { DogSummary, WalkPost } from "@/types/walk";
import { formatRemaining } from "@/utils/date";

export const START_EARLY_MINUTES = 0;
export const HIDE_AFTER_HOURS = 12;

type ReceivedParticipations = ReturnType<
  typeof useMateParticipate
>["receivedParticipations"];

export function getBadge(walking: boolean, startMs: number, now: number) {
  if (walking) {
    return {
      text: "산책 중",
      className: "bg-primary text-primary-foreground font-semibold",
    };
  }
  if (now >= startMs) {
    return {
      text: "시작 가능",
      className:
        "border border-primary bg-accent text-accent-foreground font-semibold",
    };
  }
  return {
    text: `${formatRemaining(startMs - now)} 뒤`,
    className: "bg-muted text-muted-foreground font-medium",
  };
}

export function groupWalkPosts(
  rows: ReceivedParticipations,
  now: number,
  keepPostId: string | null = null
): WalkPost[] {
  const map = new Map<string, WalkPost>();

  for (const row of rows) {
    const post = row.mate_posts;
    if (!post) continue;

    if (!map.has(post.id)) {
      map.set(post.id, {
        id: post.id,
        title: post.title,
        place: post.meeting_place,
        startAt: post.meeting_time,
        pendingCount: 0,
        applicants: [],
      });
    }

    const target = map.get(post.id)!;

    if (row.status === "pending") target.pendingCount += 1;
    if (row.status !== "accepted") continue;

    const rawDogs = row.profiles?.dogs as
      DogSummary | DogSummary[] | null | undefined;

    const dogs: DogSummary[] = Array.isArray(rawDogs)
      ? rawDogs
      : rawDogs
        ? [rawDogs]
        : [];

    target.applicants.push({
      userId: row.user_id,
      nickname: row.profiles?.nickname ?? "알 수 없음",
      dogNames: dogs.map((d) => d.name).join(", ") || "강아지 정보 없음",
      breeds: dogs
        .map((d) => d.breed)
        .filter(Boolean)
        .join(", "),
      photoUrl: dogs[0]?.photo_url ?? null,
      attended: !!row.attended,
    });
  }

  const hideBefore = now - HIDE_AFTER_HOURS * 3_600_000;

  return [...map.values()]
    .filter(
      (p) => p.id === keepPostId || new Date(p.startAt).getTime() > hideBefore
    )
    .sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );
}
