"use client";

import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useOnboarding from "@/hooks/useOnboarding";
import { OnboardingForm } from "@/types/common";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function OptionGroup<T extends string | boolean>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T | "" | null;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <Button
          key={option.label}
          type="button"
          className="flex-1"
          variant={value === option.value ? "default" : "outline"}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default function OnboardingPage() {
  const { mutate, isPending } = useOnboarding();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingForm>({
    defaultValues: {
      nickname: "",
      gender: "",
      region: "",
      dogName: "",
      dogGender: "",
      dogAge: "",
      breed: "",
      neutered: null,
      personality: "",
    },
  });

  const onSubmit = (data: OnboardingForm) => mutate(data);

  return (
    <div className="flex min-h-screen justify-center bg-background px-5 py-10">
      <div className="w-full max-w-125 rounded-2xl bg-white p-8 sm:p-10">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              <Field
                label="닉네임"
                htmlFor="nickname"
                error={errors.nickname?.message}
              >
                <Input
                  id="nickname"
                  placeholder="닉네임을 입력해주세요"
                  aria-invalid={!!errors.nickname}
                  {...register("nickname", {
                    required: "닉네임을 입력해주세요",
                  })}
                />
              </Field>

              <Field label="성별" error={errors.gender?.message}>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "성별을 선택해주세요" }}
                  render={({ field }) => (
                    <OptionGroup
                      options={[
                        { label: "남성", value: "남성" },
                        { label: "여성", value: "여성" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Field>

              <Field
                label="활동 지역"
                htmlFor="region"
                error={errors.region?.message}
              >
                <Input
                  id="region"
                  placeholder="예: 서울 마포구"
                  aria-invalid={!!errors.region}
                  {...register("region", {
                    required: "활동 지역을 입력해주세요",
                  })}
                />
              </Field>
            </div>
          </section>

          <section className="mt-10 space-y-6">
            <h2 className="text-lg font-bold">반려견 정보</h2>
            <div className="space-y-5">
              <Field
                label="이름"
                htmlFor="dogName"
                error={errors.dogName?.message}
              >
                <Input
                  id="dogName"
                  placeholder="강아지 이름을 입력해주세요"
                  aria-invalid={!!errors.dogName}
                  {...register("dogName", {
                    required: "강아지 이름을 입력해주세요",
                  })}
                />
              </Field>

              <Field label="성별" error={errors.dogGender?.message}>
                <Controller
                  name="dogGender"
                  control={control}
                  rules={{ required: "강아지 성별을 선택해주세요" }}
                  render={({ field }) => (
                    <OptionGroup
                      options={[
                        { label: "남아", value: "남아" },
                        { label: "여아", value: "여아" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Field>

              <Field
                label="나이"
                htmlFor="dogAge"
                error={errors.dogAge?.message}
              >
                <Input
                  id="dogAge"
                  placeholder="강아지 나이를 입력해주세요"
                  aria-invalid={!!errors.dogAge}
                  {...register("dogAge", {
                    required: "강아지 나이를 입력해주세요",
                    pattern: { value: /^\d+$/, message: "숫자만 입력해주세요" },
                  })}
                />
              </Field>

              <Field label="견종" htmlFor="breed" error={errors.breed?.message}>
                <Input
                  id="breed"
                  placeholder="예: 말티즈"
                  aria-invalid={!!errors.breed}
                  {...register("breed", { required: "견종을 입력해주세요" })}
                />
              </Field>

              <Field label="중성화 여부" error={errors.neutered?.message}>
                <Controller
                  name="neutered"
                  control={control}
                  rules={{
                    validate: (v) => v !== null || "중성화 여부를 선택해주세요",
                  }}
                  render={({ field }) => (
                    <OptionGroup
                      options={[
                        { label: "했어요", value: true },
                        { label: "안 했어요", value: false },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Field>

              <Field label="성격" htmlFor="personality">
                <Input
                  id="personality"
                  placeholder="예: 활발하고 다른 강아지를 좋아해요"
                  {...register("personality")}
                />
              </Field>
            </div>
          </section>

          <Button
            disabled={isPending}
            type="submit"
            className="mt-10 h-11 w-full text-lg"
          >
            {isPending ? "저장 중..." : "댕메이트 시작하기"}
          </Button>
        </form>
      </div>
    </div>
  );
}
