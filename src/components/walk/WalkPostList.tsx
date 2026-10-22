import type { WalkPost } from "@/types/walk";
import { formatMeetingTime } from "@/utils/date";
import { START_EARLY_MINUTES, getBadge } from "@/utils/walk";

type Props = {
  posts: WalkPost[];
  selectedId: string;
  walkingPostId: string | null;
  now: number;
  onSelect: (id: string) => void;
};

export default function WalkPostList({
  posts,
  selectedId,
  walkingPostId,
  now,
  onSelect,
}: Props) {
  return (
    <ul className="space-y-2">
      {posts.map((post) => {
        const isSelected = post.id === selectedId;
        const startMs =
          new Date(post.startAt).getTime() - START_EARLY_MINUTES * 60_000;
        const badge = getBadge(walkingPostId === post.id, startMs, now);

        return (
          <li key={post.id}>
            <button
              type="button"
              onClick={() => onSelect(post.id)}
              aria-pressed={isSelected}
              className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isSelected
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border bg-card text-card-foreground hover:bg-muted"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate font-bold">{post.title}</p>
                <p className="mt-0.5 text-xs opacity-70">
                  {formatMeetingTime(post.startAt, { hour: "numeric" })}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${badge.className}`}
              >
                {badge.text}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
