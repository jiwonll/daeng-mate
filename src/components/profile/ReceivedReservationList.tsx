import { ReceivedMateParticipantRow } from "@/types/mate-participants";
import { getStatusBadgeConfig } from "@/utils/participateStatus";
import { useMateParticipate } from "@/hooks/useMateParticipate";
import { formatMeetingTime } from "@/utils/date";
import { MapPin, Calendar, User } from "lucide-react";
import { Button } from "../ui/button";

export default function ReceivedReservationList({
  data,
}: {
  data: ReceivedMateParticipantRow[];
}) {
  const { updateParticipateStatus } = useMateParticipate(data[0]?.user_id);
  return (
    <div className="flex flex-col gap-4">
      {data.map((sent) => {
        const post = sent.mate_posts;
        const profile = sent.profiles;
        const dog = profile?.dogs;
        const status = sent.status;
        const statusConfig = getStatusBadgeConfig(status ?? "pending");
        const isPending = status === "pending";
        const userId = sent.user_id;
        const postId = sent.post_id;

        const handleStatusUpdate = (
          e: React.MouseEvent<HTMLButtonElement>,
          userId: string,
          postId: string,
          status: "accepted" | "rejected"
        ) => {
          e.stopPropagation();
          e.preventDefault();
          console.log("상태 변경 요청:", {
            userId,
            postId,
            status,
          });
          updateParticipateStatus({ userId, postId, status });
        };

        return (
          <div key={sent.id}>
            <div className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-amber-300 hover:shadow-md">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <div className="flex items-center gap-5">
                  {dog?.photo_url ? (
                    <img
                      src={dog.photo_url}
                      alt={dog.name}
                      className="h-20 w-20 rounded-full border border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                      <User className="h-10 w-10" />
                    </div>
                  )}
                  <div className="text-sm">
                    <span className="font-semibold text-gray-800">
                      {profile?.nickname ?? "알 수 없음"}
                    </span>
                    {dog && (
                      <span className="ml-3 text-xs text-gray-500">
                        ({dog.name} · {dog.breed})
                      </span>
                    )}
                  </div>
                </div>

                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusConfig.bgClass
                  }`}
                >
                  {statusConfig?.label ?? sent.status}
                </span>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <h3 className="line-clamp-1 text-base font-bold text-gray-900 transition-colors group-hover:text-amber-600">
                  {post?.title ?? "제목 없음"}
                </h3>

                <div className="flex flex-col gap-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                        <span className="truncate">
                          {sent?.meeting_place ?? "장소 미정"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                        <span>{formatMeetingTime(sent?.meeting_time)}</span>
                      </div>
                    </div>
                    <div>
                      {isPending && (
                        <div className="flex gap-2">
                          <Button
                            onClick={(e) =>
                              handleStatusUpdate(e, userId, postId, "accepted")
                            }
                          >
                            승인하기
                          </Button>
                          <Button
                            variant="outline"
                            onClick={(e) =>
                              handleStatusUpdate(e, userId, postId, "rejected")
                            }
                          >
                            거절하기
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
