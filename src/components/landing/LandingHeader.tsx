"use client";

import Image from "next/image";

export default function LandingHeader() {
  return (
    <header className="flex items-center justify-start gap-1 pt-1 pb-0.5 pl-2 pr-2">
      <img
        className="w-20 -ml-1 pt-1 rounded-full"
        src="/images/dog-logo.svg"
        alt="댕메이트 로고"
      />
      <img
        className="w-32 -ml-6 pt-3"
        src="/images/dangmate-text.svg"
        alt="댕메이트"
      />
    </header>
  );
}
