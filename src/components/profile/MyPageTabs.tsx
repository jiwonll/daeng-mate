"use client";

import { useState } from "react";
import ProfileEdit from "@/components/profile/ProfileEdit";
import DogManagement from "@/components/profile/DogManagement";
import ReservationList from "@/components/profile/ReservationList";
import MyPosts from "@/components/profile/MyPosts";
import { CalendarCheck, User, Dog } from "lucide-react";

export default function MyPageTabs() {
  const [activeTab, setActiveTab] = useState<
    "reservations" | "profile" | "dogs" | "myPosts"
  >("reservations");

  return (
    <div className="space-y-6">
      <nav className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
        <button
          onClick={() => setActiveTab("reservations")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "reservations"
              ? "bg-amber-400 text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          받은 산책 신청
          <span className="bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ml-0.5">
            2
          </span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "profile"
              ? "bg-amber-400 text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <User className="w-4 h-4" />내 정보 수정
        </button>

        <button
          onClick={() => setActiveTab("dogs")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "dogs"
              ? "bg-amber-400 text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Dog className="w-4 h-4" />내 강아지 관리
        </button>

        <button
          onClick={() => setActiveTab("myPosts")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "myPosts"
              ? "bg-amber-400 text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          내가 작성한 모집글
        </button>
      </nav>

      {activeTab === "reservations" && <ReservationList />}
      {activeTab === "profile" && <ProfileEdit />}
      {activeTab === "dogs" && <DogManagement />}
      {activeTab === "myPosts" && <MyPosts />}
    </div>
  );
}
