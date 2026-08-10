"use client";

import Image from "next/image";

export default function LandingHeader() {
  return (
    <header className="flex items-center justify-start gap-1">
      <img
        className="w-20 rounded-full"
        src="/images/dog-logo.png"
        alt="댕메이트 로고"
      />
      <span className="font-[var(--font-jua)] text-2xl">댕메이트</span>
    </header>
  );
}
