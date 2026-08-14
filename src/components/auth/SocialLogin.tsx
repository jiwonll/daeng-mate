"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SocialLogin() {
  return (
    <div className="max-w-[600px] w-full mx-auto">
      <Button className="bg-white border border-gray-300 text-gray-800 leading-none w-full h-13 py-5 self-center font-medium text-lg mt-2">
        <Image src="/icons/google.png" alt="Google" width={40} height={40} />
        구글 계정으로 로그인
      </Button>
      <Button className="mt-3 leading-none bg-[#FEE500] w-full h-13 py-5 self-center font-medium text-lg">
        <Image src="/icons/kakao.png" alt="Kakao" width={45} height={45} />
        카카오 계정으로 로그인
      </Button>
    </div>
  );
}
