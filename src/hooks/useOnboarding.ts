"use client";

import { toast } from "sonner";
import { OnboardingForm } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function useOnboarding() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (form: OnboardingForm) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("인증 세션이 만료되었습니다.");
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        nickname: form.nickname,
        region: form.region,
        gender: form.gender,
        is_onboarded: true,
      });

      if (profileError)
        throw new Error(`보호자 정보 저장 실패: ${profileError.message}`);
      const { error: dogError } = await supabase.from("dogs").upsert({
        user_id: user.id,
        name: form.dogName,
        breed: form.breed,
        age: form.dogAge,
        neutered: form.neutered,
        personality: form.personality,
        gender: form.dogGender,
      });

      if (dogError)
        throw new Error(`반려견 정보 저장 실패: ${dogError.message}`);

      return user.id;
    },
    onSuccess: (userId) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["dog"] });
      toast.success("댕메이트에 오신 것을 환영합니다.");
      router.replace("/main");
    },
    onError: (error) => {
      toast.error(
        error.message || "정보 저장에 실패했습니다. 다시 시도해주세요"
      );
    },
  });

  return { mutate, isPending };
}
