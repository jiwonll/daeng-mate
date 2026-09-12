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
