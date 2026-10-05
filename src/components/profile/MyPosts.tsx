import { useMatePosts } from "@/hooks/useMatePosts";
import { Edit, MapPin, User, Dog, Trash2 } from "lucide-react";
import { formatMeetingTime } from "@/utils/date";
import { useRouter } from "next/navigation";
import { useMateParticipate } from "@/hooks/useMateParticipate";

export default function MyPosts({ userId }: { userId: string }) {
  const { matePosts, isLoading } = useMatePosts();
  const myPost = matePosts?.filter((post) => post.user_id === userId);
  const router = useRouter();
  const { receivedQuery } = useMateParticipate(userId);
  const received = receivedQuery.data;

  return (
    <div className="space-y-4">
      {myPost?.map((post) => {
        const profile = post.profiles;
        const dog = profile?.dogs;
        const acceptedCount = received?.filter(
          (item) => item.status === "accepted" && item.post_id === post.id
        ).length;

        return (
          <div
            key={post.id}
            onClick={() => router.push(`/mates/${post.id}`)}
            className="flex p-8 border-2 border-slate-100 bg-white rounded-2xl gap-8 shadow-sm items-center justify-between transition-all hover:border-amber-200"
          >
            <div className="flex-1 flex flex-col font-jua text-lg gap-2 text-slate-800">
              <div className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>{post.meeting_place || "장소 미정"}</span>
              </div>

              <div className="flex items-center gap-6 text-base">
                <div>
                  모임일:
                  <span className="ml-2 font-light text-primary">
                    {formatMeetingTime(post.meeting_time)}
                  </span>
                </div>
                <div>
                  승인한 강아지:
                  <span className="text-amber-500"> {acceptedCount} </span>
                  마리
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1 text-base text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>작성자:</span>
                  <span className="ml-1 font-light text-primary">
                    {profile?.nickname || "-"}
                  </span>
                </div>

                {dog && (
                  <div className="flex items-center gap-1">
                    <Dog className="w-4 h-4 text-amber-500" />
                    <span>내 강아지:</span>
                    <span className="ml-1 font-light text-primary">
                      {dog.name} ({dog.breed || "견종 미정"})
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0 self-start">
              <button
                type="button"
                className="p-2 cursor-pointer bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl shadow-md transition-all"
                title="수정"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 cursor-pointer bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-xl transition-all"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
