"use client";

import { useState } from "react";
import { Inbox, SendIcon } from "lucide-react";
import ReceivedReservationList from "./ReceivedReservationList";
import SentReservationList from "./SentReservationList";
import { useMateParticipate } from "@/hooks/useMateParticipate";

type ReservationListProps = {
  userId: string;
};

export default function ReservationList({ userId }: ReservationListProps) {
  const [subTab, setSubTab] = useState<"received" | "sent">("received");
  const { sentParticipations, receivedParticipations } =
    useMateParticipate(userId);

  return (
    <div className="space-y-5">
      <div className="flex bg-[#ffffff] p-1 rounded-xl max-w-xs mx-auto">
        <button
          onClick={() => setSubTab("received")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            subTab === "received"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Inbox className="w-3.5 h-3.5" />
          받은 신청
          <span className="bg-amber-400 text-slate-900 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
            2
          </span>
        </button>

        <button
          onClick={() => setSubTab("sent")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            subTab === "sent"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <SendIcon className="w-3.5 h-3.5" />
          내가 신청한 내역
        </button>
      </div>

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
