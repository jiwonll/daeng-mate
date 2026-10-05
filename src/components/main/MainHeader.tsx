"use client";

import { useGetProfile } from "@/hooks/useProfile";
import { useUser } from "@/hooks/useUser";

export default function MainHeader() {
  const { user } = useUser();
  const userId = user?.id;
  const { profile, isLoading } = useGetProfile(userId);
  if (!user) {
    return;
  }
  return (
    <div className="flex gap-1 flex-col">
      <div className="flex justify-between">
        <span className="font-medium text-2xl font-jua">
          {isLoading ? "반가워요!" : `안녕하세요, ${profile?.nickname}님 👋`}
        </span>
      </div>
      <span className="font-jua text-lg">
        오늘도 신나는 산책을 시작해볼까요?
      </span>
    </div>
  );
}
