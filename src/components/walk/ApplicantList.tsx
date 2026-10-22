import type { Applicant } from "@/types/walk";
import { Button } from "../ui/button";
import { Dog } from "lucide-react";

type Props = {
  applicants: Applicant[];
  pendingCount: number;
  disabled: boolean;
  onToggleAttendance: (userId: string, attended: boolean) => void;
};

export default function ApplicantList({
  applicants,
  pendingCount,
  disabled,
  onToggleAttendance,
}: Props) {
  const attendedCount = applicants.filter((a) => a.attended).length;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold text-card-foreground">함께할 강아지</h3>
        <span className="text-xs text-muted-foreground">
          승인 {applicants.length}마리 · 확인 {attendedCount}
        </span>
      </div>

      {pendingCount > 0 && (
        <p className="mb-2 rounded-xl bg-accent px-3 py-2 text-xs text-accent-foreground">
          승인을 기다리는 신청이 {pendingCount}건 있어요.
        </p>
      )}

      {applicants.length === 0 ? (
        <p className="rounded-xl bg-muted p-4 text-center text-sm text-muted-foreground">
          아직 승인한 신청이 없어요. 신청을 승인하면 여기에 보여요.
        </p>
      ) : (
        <ul className="divide-y">
          {applicants.map((a) => (
            <li key={a.userId} className="flex items-center gap-3 py-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent text-accent-foreground text-2xl">
                {a.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.photoUrl}
                    alt={`${a.dogNames} 사진`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span aria-hidden>
                    <Dog />
                  </span>
                )}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-card-foreground">
                  {a.dogNames}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {a.breeds ? `${a.breeds} · ` : ""}
                  보호자 {a.nickname}
                </p>
              </div>

              <Button
                type="button"
                disabled={disabled}
                aria-pressed={a.attended}
                onClick={() => onToggleAttendance(a.userId, !a.attended)}
                className={`${
                  a.attended
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-amber-100 border border-primary text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {a.attended ? "✓ 확인 완료" : "참가 확인"}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
