"use client";

import Image from "next/image";

export default function LandingHeader() {
  return (
    <header className="flex items-center justify-start gap-3">
      <img
        className="w-20 rounded-full object-cover scale-120"
        src="/images/dog-logo.png"
        alt="댕메이트 로고"
      />
      <span className="font-semibold text-2xl">댕메이트</span>
    </header>
  );
}
