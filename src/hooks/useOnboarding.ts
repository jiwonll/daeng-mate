"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function useOnboarding() {
  const [isLoading, setIsLoading] = useState(false);

  const submitOnboarding = async (data: {
    nickname: string;
    gender: string;
    location: string;
    dogName: string;
    dogGender: string;
    dogAge: number;
    breed: string;
    neutered: boolean;
    personality: string;
  }) => {
    try {
      setIsLoading(true);

      toast.success("온보딩이 완료되었습니다!");
    } catch (error) {
      console.error("Onboarding Error:", error);
      toast.error("정보 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitOnboarding,
    isLoading,
  };
}
