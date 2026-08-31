"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/auth/PasswordInput";
import SocialSignup from "./SocialSignup";
import Link from "next/link";
import { signUp } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { mutate: handleSignup, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      if (data.user) {
        toast.success("회원가입 성공");
        router.replace("/login");
        router.refresh();
      }
    },

    onError: (error: Error) => {
      console.error("회원가입 실행 중 에러:", error);
      toast.error(
        `회원가입 실패: ${error.message || "알 수 없는 오류가 발생했습니다."}`
      );
    },
  });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    handleSignup({ email, password });
  };

  return (
    <div className="max-w-150 w-full mx-auto flex justify-center min-h-screen -mt-5 flex-col items-center">
      <Image
        width={300}
        height={100}
        alt="로고 이미지"
        src="/icons/logo.svg"
        className="w-48 md:w-70 h-auto"
      />
      <div className="w-full mt-1 flex flex-col px-10">
        <span className="self-start text-3xl font-medium font-jua">
          환영합니다!
        </span>
        <span className="mt-1 self-start text-2xl font-normal font-jua">
          <span className="text-primary">댕메이트</span>에 회원가입 하세요
        </span>
        <form
          onSubmit={onSubmit}
          className="mt-6 flex flex-col justify-center gap-5 w-full"
        >
          <Input
            className="border-foreground placeholder:text-muted-foreground h-10 px-5"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            required
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />

          <PasswordInput
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            disabled={isPending}
            placeholder="비밀번호를 한번 더 입력해주세요"
          />

          <Button
            type="submit"
            disabled={isPending}
            className="leading-none w-full h-13 py-5 self-center font-medium text-lg mt-2"
          >
            {isPending ? "회원가입 중..." : "회원가입 하기"}
          </Button>
        </form>
        <Button
          asChild
          className="bg-secondary leading-none w-full h-13 py-5 self-center font-medium text-lg mt-2"
        >
          <Link href={"/login"}>로그인 하기</Link>
        </Button>
        <hr className="my-5 border-t border-gray-300" />
        <SocialSignup />
      </div>
    </div>
  );
}
