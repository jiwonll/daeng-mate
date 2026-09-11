"use client";

import { getCurrentProfile } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";

export default function MainHeader() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentProfile,
  });
  return (
    <div className="flex gap-1 flex-col">
      <div className="flex justify-between">
        <span className="font-medium text-2xl font-jua">
          {isLoading ? "반가워요!" : `안녕하세요, ${profile?.nickname}님 👋`}
        </span>
        <Bell></Bell>
      </div>
      <span className="font-jua text-lg">
        오늘도 신나는 산책을 시작해볼까요?
      </span>
    </div>
  );
}
