export type StatusBadgeConfig = {
  label: string;
  bgClass: string;
  textClass: string;
};

export function getStatusBadgeConfig(status: string): StatusBadgeConfig {
  switch (status) {
    case "accepted":
      return {
        label: "수락됨",
        bgClass: "bg-emerald-100",
        textClass: "text-emerald-700",
      };
    case "rejected":
      return {
        label: "거절됨",
        bgClass: "bg-rose-100",
        textClass: "text-rose-700",
      };
    case "canceled":
      return {
        label: "취소됨",
        bgClass: "bg-gray-100",
        textClass: "text-gray-500",
      };
    case "pending":
    default:
      return {
        label: "대기중",
        bgClass: "bg-accent",
        textClass: "text-accent-foreground",
      };
  }
}
