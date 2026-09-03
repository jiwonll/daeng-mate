"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useOnboarding from "@/hooks/useOnboarding";

export default function OnboardingPage() {
  const { submitOnboarding, isLoading } = useOnboarding();

  const [form, setForm] = useState({
    nickname: "",
    gender: "",
    location: "",
    dogName: "",
    dogGender: "",
    dogAge: "",
    breed: "",
    neutered: false,
    personality: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await submitOnboarding({
      ...form,
      dogAge: Number(form.dogAge),
    });
  };

  return (
    <main className="flex min-h-screen justify-center bg-[#FFF9E8] px-4 py-10">
      <div className="w-full max-w-[500px] rounded-3xl bg-white p-8">
        <div className="mb-8">
          <img
            src="/icons/logo.svg"
            alt="댕메이트 로고"
            className="mx-auto h-40 w-40 object-contain"
          />
          <h1 className="text-2xl font-bold -mt-5">
            댕메이트를 시작하기 전에
            <br />
            정보를 알려주세요
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            산책 메이트를 찾는 데 사용되는 정보예요.
          </p>
        </div>

        {/* 사용자 정보 */}
        <section className="space-y-5">
          <h2 className="text-lg font-semibold">내 정보</h2>

          <div>
            <label className="mb-2 block text-sm font-medium">닉네임</label>

            <Input
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">성별</label>

            <div className="flex gap-2">
              {["남성", "여성"].map((gender) => (
                <Button
                  key={gender}
                  type="button"
                  variant={form.gender === gender ? "default" : "outline"}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      gender,
                    }))
                  }
                  className="flex-1"
                >
                  {gender}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">활동 지역</label>

            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="예: 서울 마포구"
            />
          </div>
        </section>

        {/* 강아지 정보 */}
        <section className="mt-10 space-y-5">
          <h2 className="text-lg font-semibold">반려견 정보</h2>

          <div>
            <label className="mb-2 block text-sm font-medium">이름</label>

            <Input
              name="dogName"
              value={form.dogName}
              onChange={handleChange}
              placeholder="강아지 이름을 입력해주세요"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">성별</label>

            <div className="flex gap-2">
              {["남아", "여아"].map((gender) => (
                <Button
                  key={gender}
                  type="button"
                  variant={form.dogGender === gender ? "default" : "outline"}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      dogGender: gender,
                    }))
                  }
                  className="flex-1"
                >
                  {gender}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">나이</label>

            <Input
              name="dogAge"
              type="number"
              value={form.dogAge}
              onChange={handleChange}
              placeholder="강아지 나이"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">견종</label>

            <Input
              name="breed"
              value={form.breed}
              onChange={handleChange}
              placeholder="예: 말티즈"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              중성화 여부
            </label>

            <div className="flex gap-2">
              <Button
                type="button"
                variant={form.neutered ? "default" : "outline"}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    neutered: true,
                  }))
                }
                className="flex-1"
              >
                했어요
              </Button>

              <Button
                type="button"
                variant={!form.neutered ? "default" : "outline"}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    neutered: false,
                  }))
                }
                className="flex-1"
              >
                안 했어요
              </Button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">성격</label>

            <Input
              name="personality"
              value={form.personality}
              onChange={handleChange}
              placeholder="예: 활발하고 다른 강아지를 좋아해요"
            />
          </div>
        </section>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-10 h-12 w-full"
        >
          {isLoading ? "저장 중..." : "댕메이트 시작하기"}
        </Button>
      </div>
    </main>
  );
}
