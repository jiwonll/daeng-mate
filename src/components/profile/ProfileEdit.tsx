"use client";

import { useState } from "react";
import ProfileInfoForm from "./ProfileInfoForm";
import AccountChangeForm from "./AccountChangeForm";

export default function ProfileEdit({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState<"profile" | "account">("profile");

  return (
    <div className="space-y-6">
      <nav className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex-1 cursor-pointer flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === "profile"
              ? "bg-amber-400 text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          기본 정보
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("account")}
          className={`flex-1 cursor-pointer flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === "account"
              ? "bg-amber-400 text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          계정 설정
        </button>
      </nav>

      {activeTab === "profile" ? (
        <ProfileInfoForm userId={userId} />
      ) : (
        <AccountChangeForm />
      )}
    </div>
  );
}
