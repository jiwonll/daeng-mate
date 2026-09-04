"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function OnboardingPage() {
  const { isPending } = useMutation({
    // mutationFn:
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen justify-center bg-background px-5 py-10">
      <div className="w-full max-w-125 rounded-2xl bg-white p-8 sm:p-10">
        <form onSubmit={handleSubmit}>
          <div>
            <Image
              width={150}
              height={150}
              alt="댕메이트 로고"
              src="/icons/logo.svg"
              className="mx-auto mb-6"
            />

            <div className="mb-10 flex flex-col gap-2">
              <h3 className="text-xl font-semibold">
                댕메이트를 시작하기 전에 정보를 알려주세요
              </h3>

              <span className="text-sm text-chart-2">
                산책 메이트를 찾는데 사용되는 정보예요
              </span>
            </div>
          </div>

          <section className="space-y-6">
            <h2 className="text-lg font-bold">내 정보</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">닉네임</label>

                <Input
                  name="nickname"
                  placeholder="닉네임을 입력해주세요"
                  value={form.nickname}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, nickname: e.target.value }));
                  }}
                />
              </div>

              <div>
                <span className="mb-2 block text-sm font-medium">성별</span>

                <div className="flex gap-2">
                  {["남성", "여성"].map((gender) => (
                    <Button
                      type="button"
                      key={gender}
                      variant={form.gender === gender ? "default" : "outline"}
                      onClick={() => {
                        setForm((prev) => ({ ...prev, gender }));
                      }}
                      className="flex-1"
                    >
                      {gender}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  활동 지역
                </label>

                <Input
                  name="location"
                  placeholder="예: 서울 마포구"
                  value={form.location}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, location: e.target.value }))
                  }
                />
              </div>
            </div>
          </section>

          <section className="mt-10 space-y-6">
            <h2 className="text-lg font-bold">반려견 정보</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">이름</label>

                <Input
                  placeholder="강아지 이름을 입력해주세요"
                  name="dogName"
                  value={form.dogName}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, dogName: e.target.value }))
                  }
                />
              </div>

              <div>
                <span className="mb-2 block text-sm font-medium">성별</span>

                <div className="flex gap-2">
                  {["남아", "여아"].map((gender) => (
                    <Button
                      key={gender}
                      type="button"
                      className="flex-1"
                      variant={
                        form.dogGender === gender ? "default" : "outline"
                      }
                      onClick={() =>
                        setForm((prev) => ({ ...prev, dogGender: gender }))
                      }
                    >
                      {gender}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">나이</label>

                <Input
                  placeholder="강아지 나이를 입력해주세요"
                  name="dogAge"
                  value={form.dogAge}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, dogAge: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">견종</label>

                <Input
                  placeholder="예: 말티즈"
                  name="breed"
                  value={form.breed}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, breed: e.target.value }))
                  }
                />
              </div>

              <div>
                <span className="mb-2 block text-sm font-medium">
                  중성화 여부
                </span>

                <div className="flex gap-2">
                  {["했어요", "안 했어요"].map((neuteredBol) => (
                    <Button
                      key={neuteredBol}
                      type="button"
                      variant={
                        form.neutered === (neuteredBol === "했어요")
                          ? "default"
                          : "outline"
                      }
                      className="flex-1"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          neutered: neuteredBol === "했어요" ? true : false,
                        }))
                      }
                    >
                      {neuteredBol}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">성격</label>

                <Input
                  placeholder="예: 활발하고 다른 강아지를 좋아해요"
                  name="personality"
                  value={form.personality}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      personality: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </section>

          <Button type="submit" className="mt-10 h-11 w-full text-lg">
            {isPending ? "저장 중..." : "댕메이트 시작하기"}
          </Button>
        </form>
      </div>
    </div>
  );
}
