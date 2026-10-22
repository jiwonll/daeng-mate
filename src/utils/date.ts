export function formatMeetingTime(
  dateInput?: string | Date | null,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!dateInput) return "일시 미정";

  try {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) {
      return "일시 미정";
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      ...options,
    };

    return new Intl.DateTimeFormat("ko-KR", defaultOptions).format(date);
  } catch (error) {
    console.error("formatMeetingTime 오류:", error);
    return "일시 미정";
  }
}

export function formatRemaining(ms: number): string {
  const totalMin = Math.max(1, Math.ceil(ms / 60_000));
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const mins = totalMin % 60;

  if (days > 0) return `${days}일 ${hours}시간`;
  if (hours > 0) return `${hours}시간 ${mins}분`;
  return `${mins}분`;
}

export function formatElapsed(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const mm = String(mins).padStart(2, "0");
  const ss = String(secs).padStart(2, "0");
  return `${hrs > 0 ? `${hrs}:` : ""}${mm}:${ss}`;
}
