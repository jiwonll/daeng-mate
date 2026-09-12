"use client";

import { ArrowLeft, MapPin, Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useWriteStore } from "@/stores/useWriteStore";
import { useCreateMatePost } from "@/hooks/useMatePosts";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function WriteForm() {
  const { createPost, isPending } = useCreateMatePost();
  const {
    title,
    content,
    meeting_place,
    meeting_time,
    meeting_date,
    setField,
    resetForm,
    getMeetingTimestamp,
  } = useWriteStore();

  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = () => {
    const meetingTimestamp = getMeetingTimestamp();
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      toast.error("본문 내용을 입력해주세요.");
      return;
    }

    if (!meeting_place.trim()) {
      toast.error("산책 장소를 입력해주세요.");
      return;
    }

    if (!meetingTimestamp) {
      toast.error("산책 일시를 모두 선택해주세요.");
      return;
    }

    if (!user?.id) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    const payload = {
      title,
      content,
      meeting_place,
      meeting_time: meetingTimestamp,
      user_id: user.id!,
    };

    createPost(payload, {
      onSuccess: (data) => {
        toast.success("모집글이 등록되었습니다");
        resetForm();
        router.push(`/mates/${data.id}`);
      },
      onError: () => {
        toast.error("모집글 등록에 실패했습니다.");
      },
    });
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-15 w-full">
        <Link
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          href="/mate"
        >
          <ArrowLeft size={18} />
          목록으로 돌아가기
        </Link>
        <h5 className="text-lg font-bold">산책 메이트 모집하기</h5>
      </div>

      <div className="flex flex-col gap-4 mt-5 border rounded-2xl mx-auto p-6">
        <div className="flex flex-col gap-2">
          <h5 className="font-semibold">내 강아지</h5>
          <div className="border border-gray-300 rounded-md p-2 bg-gray-50 text-gray-700">
            뽀삐
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">제목</span>
          <input
            className="border border-gray-300 rounded-md p-2"
            type="text"
            placeholder="주말 저녁 한강 산책 메이트 구해요"
            value={title}
            onChange={(e) => setField("title", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">본문</span>
          <textarea
            className="border border-gray-300 rounded-md p-2 h-30"
            placeholder="산책 스타일, 우리 강아지 성격, 만나고 싶은 메이트 등을 자유롭게 적어주세요"
            value={content}
            onChange={(e) => setField("content", e.target.value)}
          />
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex flex-col flex-1">
            <div className="flex gap-2 mb-2 items-center text-sm font-medium">
              <MapPin size={18} />
              <span>산책 장소</span>
            </div>
            <input
              className="border border-gray-300 rounded-md p-2"
              type="text"
              placeholder="예: 한강공원 반포지구"
              value={meeting_place}
              onChange={(e) => setField("meeting_place", e.target.value)}
            />
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex gap-2 mb-2 items-center text-sm font-medium">
              <CalendarIcon size={18} />
              <span>산책 일시</span>
            </div>

            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`flex-1 justify-start text-left bg-[#ffffff] font-normal border-gray-300 ${
                      !meeting_date && "text-muted-foreground "
                    }`}
                  >
                    {meeting_date ? (
                      format(new Date(meeting_date), "yyyy년 MM월 dd일", {
                        locale: ko,
                      })
                    ) : (
                      <span>날짜 선택</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={meeting_date ? new Date(meeting_date) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        setField("meeting_date", format(date, "yyyy-MM-dd"));
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>

              <input
                className="border border-gray-300 rounded-md p-2 flex-1"
                type="time"
                value={meeting_time}
                onChange={(e) => setField("meeting_time", e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button disabled={isPending} onClick={handleSubmit} className="mt-4">
          {isPending ? "등록 중..." : "모집글 등록하기"}
        </Button>
      </div>
    </div>
  );
}
