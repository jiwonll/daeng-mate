"use client";

import { ArrowLeft, MapPin, Calendar as CalendarIcon, Dog } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useWriteStore } from "@/stores/useWriteStore";
import { useCreateMatePost, useMatePosts } from "@/hooks/useMatePosts";
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
  const { matePosts } = useMatePosts();
  const myPost = matePosts?.find((m) => user?.id === m.user_id);
  const dogName = myPost?.profiles?.dogs?.name;

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
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-center mb-6 sm:mb-8 border-b pb-4">
        <Link
          className="absolute left-0 flex items-center gap-1.5 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
          href="/mates"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>목록으로</span>
        </Link>
        <h1 className="font-jua text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
          산책 메이트 모집하기
        </h1>
      </div>

      <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-8 lg:p-10 shadow-sm flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-1.5">
            <Dog size={18} className="text-primary" />내 강아지
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-2.5 sm:p-3 bg-gray-50/80 w-full sm:w-fit sm:min-w-[200px]">
            <span className="text-sm sm:text-base font-semibold text-gray-800">
              {dogName ?? "강아지 정보 없음"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base font-semibold text-gray-700">
            제목
          </label>
          <input
            className="w-full border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 text-sm sm:text-base outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400"
            type="text"
            placeholder="주말 저녁 한강 산책 메이트 구해요"
            value={title}
            onChange={(e) => setField("title", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base font-semibold text-gray-700">
            본문
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-xl p-3.5 sm:p-4 text-sm sm:text-base outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400 resize-none h-48 sm:h-60"
            placeholder="산책 스타일, 우리 강아지 성격, 만나고 싶은 메이트 등을 자유롭게 적어주세요"
            value={content}
            onChange={(e) => setField("content", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-gray-700">
              <MapPin size={18} className="text-gray-500" />
              산책 장소
            </label>
            <input
              className="w-full border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 text-sm sm:text-base outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400"
              type="text"
              placeholder="예: 한강공원 반포지구"
              value={meeting_place}
              onChange={(e) => setField("meeting_place", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-gray-700">
              <CalendarIcon size={18} className="text-gray-500" />
              산책 일시
            </label>

            <div className="flex flex-col sm:flex-row gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`flex-1 justify-start text-left h-10 px-3.5 rounded-xl font-normal text-sm sm:text-base border-gray-300 bg-white hover:bg-gray-50 ${
                      !meeting_date && "text-muted-foreground"
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
                <PopoverContent
                  className="w-auto p-0 rounded-2xl"
                  align="start"
                >
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
                className="w-full sm:w-36 border border-gray-300 rounded-xl px-3 py-2 text-sm sm:text-base outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                type="time"
                value={meeting_time}
                onChange={(e) => setField("meeting_time", e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button
          disabled={isPending}
          onClick={handleSubmit}
          className="mt-2 sm:mt-4 h-11 sm:h-12 rounded-xl text-base sm:text-lg font-semibold shadow-md hover:shadow-lg transition-all w-full"
        >
          {isPending ? "등록 중..." : "모집 등록하기"}
        </Button>
      </div>
    </div>
  );
}
