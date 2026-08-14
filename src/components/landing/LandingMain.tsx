"use client";

import { Button } from "@/components/ui/button";
import useNavigateByAuth from "@/hooks/useNavigateByAuth";
import LandingIntro from "../common/LandingIntro";

export default function LandingMain() {
  const navigateByAuth = useNavigateByAuth();
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-5 pt-20">
        <h1 className="text-3xl md:text-5xl font-bold font-jua pt-10 text-center">
          <span>
            <span className="text-primary">댕메이트</span>와 함께하는
          </span>
          <span className="mt-3 block">더 즐거운 산책</span>
        </h1>
        <span className="text-sm md:text-lg text-center">
          실시간 산책 기록과 동네 메이트 매칭으로 더 행복한 산책을 경험하세요
        </span>
        <div className="pt-5">
          <Button
            size="lg"
            className="font-jua text-xl"
            onClick={navigateByAuth}
          >
            산책 메이트 찾으러 가기
          </Button>
        </div>

        <img
          className="w-96 -mt-25 pointer-events-none"
          src="/images/landing/dog.svg"
          alt="댕메이트 메인 이미지"
        />
      </section>
      <div className="grid gap-10 md:grid-cols-3 mb-10 p-20 -mt-40">
        <LandingIntro
          image="/images/landing/intro-1.svg"
          title="산책 메이트 찾기"
          description="우리 동네에서 산책할 메이트를 쉽고 안전하게 찾아요"
          imageClassName="w-50"
        />
        <LandingIntro
          image="/images/landing/intro-2.svg"
          title="실시간 산책 기록"
          description="산책 거리, 시간, 속도, 경로를 실시간으로 기록하고 관리해요"
        />
        <LandingIntro
          image="/images/landing/intro-3.svg"
          title="건강한 산책 습관"
          description="산책 통계를 통해 반려견의 건강 상태를 체크할 수 있어요"
          imageClassName="-mt-1"
        />
      </div>
    </>
  );
}
