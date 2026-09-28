"use client";

import { useState } from "react";
import { Inbox, SendIcon } from "lucide-react";
import ReceivedReservationList from "./ReceivedReservationList";
import SentReservationList from "./SentReservationList";
import { useMateParticipate } from "@/hooks/useMateParticipate";

export default function ReservationList({ userId }: { userId: string }) {
  const [subTab, setSubTab] = useState<"received" | "sent">("received");
  const { sentParticipations, receivedParticipations } =
    useMateParticipate(userId);

  return (
    <div className="space-y-6">
      <nav className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => setSubTab("received")}
          className={`flex-1 cursor-pointer flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
            subTab === "received"
              ? "bg-amber-400 text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Inbox className="w-4 h-4" />
          받은 신청
        </button>

        <button
          type="button"
          onClick={() => setSubTab("sent")}
          className={`flex-1 cursor-pointer flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
            subTab === "sent"
              ? "bg-amber-400 text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <SendIcon className="w-4 h-4" />
          내가 신청한 내역
        </button>
      </nav>

      <div className="space-y-3">
        {subTab === "received" ? (
          <ReceivedReservationList data={receivedParticipations} />
        ) : (
          <SentReservationList data={sentParticipations} />
        )}
      </div>
    </div>
  );
}
