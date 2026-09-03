"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import useAuthActions from "@/hooks/useAuthActions";

export default function SocialLogin() {
  const { loginWithKakao } = useAuthActions();
  return (
    <div className="max-w-150 w-full mx-auto">
      <Button
        onClick={() => loginWithKakao()}
        className="mt-3 leading-none bg-[#FEE500] w-full h-13 py-5 self-center font-medium text-lg"
      >
        <Image src="/icons/kakao.png" alt="Kakao" width={45} height={45} />
        카카오 계정으로 로그인
      </Button>
    </div>
  );
}
