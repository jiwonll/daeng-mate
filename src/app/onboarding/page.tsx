"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OnboardingPage() {
  const [nickname, setNickname] = useState("");
  const [dogName, setDogName] = useState("");

  const handleSubmit = () => {
    // TODO: 온보딩 정보 저장
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF9E8] px-4">
      <div className="w-full max-w-[480px] rounded-3xl bg-white p-8 shadow-sm">
        {/* 상단 */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-[#F5A623]">
            댕메이트에 오신 걸 환영해요 🐶
          </p>

          <h1 className="text-2xl font-bold leading-tight text-gray-900">
            어떤 이름으로
            <br />
            불러드릴까요?
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            댕메이트에서 사용할 기본 정보를 알려주세요.
          </p>
        </div>

        {/* 입력 */}
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              닉네임
            </label>

            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요"
              className="h-12"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              강아지 이름
            </label>

            <Input
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
              placeholder="강아지 이름을 입력해주세요"
              className="h-12"
            />
          </div>
        </div>

        {/* 버튼 */}
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!nickname || !dogName}
          className="mt-8 h-12 w-full rounded-xl bg-[#F5A623] text-white hover:bg-[#E89A16]"
        >
          시작하기
        </Button>
      </div>
    </main>
  );
}
