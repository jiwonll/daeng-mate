"use client";

import { Button } from "@/components/ui/button";
import useNavigateByAuth from "@/hooks/useAuthActions";

export default function LandingHeader() {
  const navigateByAuth = useNavigateByAuth();
  return (
    <div className="bg-background opacity-90 shadow-sm flex items-center justify-between gap-1 pt-1 pb-2 pl-2 pr-2 sticky top-0 z-50">
      <header className="flex items-center justify-start gap-1 pt-1 pb-0.5 pl-2 pr-2">
        <img
          className="w-20 -ml-1 pt-1 rounded-full"
          src="/images/dog-logo.svg"
          alt="댕메이트 로고"
        />
        <img
          className="w-32 -ml-8 pt-3"
          src="/images/dangmate-text.svg"
          alt="댕메이트"
        />
      </header>
      <div className="flex items-center justify-end gap-2 pr-1">
        <Button
          onClick={navigateByAuth}
          className="text-sm font-bold text-gray-600 hover:text-gray-800"
        >
          로그인
        </Button>
        <Button
          onClick={navigateByAuth}
          className="text-sm font-bold text-gray-600 hover:text-gray-800"
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
