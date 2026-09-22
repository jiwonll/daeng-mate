"use client";

import { SentMateParticipantRow } from "@/types/mate-participants";
import { getStatusBadgeConfig } from "@/utils/participateStatus";
import { Label } from "../ui/label";
import { MapPin, Calendar, User } from "lucide-react";
import { formatMeetingTime } from "@/utils/date";
import { useMateParticipate } from "@/hooks/useMateParticipate";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SentReservationList({
  data,
}: {
  data: SentMateParticipantRow[];
}) {
  const router = useRouter();
  const currentUserId = data[0]?.user_id;
  const { deleteParticipate } = useMateParticipate(currentUserId);
  return (
    <div className="flex flex-col gap-4 cursor-pointer">
      {data.map((sent) => {
        const post = sent.mate_posts;
        const profile = post?.profiles;
        const dog = profile?.dogs;
        const statusConfig = getStatusBadgeConfig(sent.status ?? "pending");
        const isPending = sent.status === "pending";
        const userId = sent.user_id;
        const postId = sent.post_id;

        const handleCancel = (e: React.MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();

          if (confirm("신청을 취소하시겠습니까?")) {
            deleteParticipate({ userId, postId });
          }
        };

        const handleCardClick = () => {
          if (postId) {
            router.push(`/mates/${postId}`);
          }
        };

        return (
          <div onClick={handleCardClick} key={sent.id}>
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
                  }
                `}
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
                          {post?.meeting_place ?? "장소 미정"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                        <span>{formatMeetingTime(post?.meeting_time)}</span>
                      </div>
                    </div>
                    <div>
                      {isPending && (
                        <Button onClick={(e) => handleCancel(e)}>
                          신청 취소
                        </Button>
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
