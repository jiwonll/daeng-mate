"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/auth/PasswordInput";
import SocialLogin from "./SocialLogin";
import Link from "next/link";
import { signInWithPassword } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: signInWithPassword,
    onSuccess: () => {
      toast.success("로그인 성공");
      router.replace("/main");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(
        `로그인 실패: ${error.message || "알 수 없는 오류가 발생했습니다."}`
      );
    },
  });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin({ email, password });
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
          <span className="text-primary">댕메이트</span>에 로그인 하세요
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
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">로그인 상태 유지</Label>
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="leading-none w-full h-13 py-5 self-center font-medium text-lg mt-2"
          >
            {isPending ? "로그인 중..." : "로그인 하기"}
          </Button>
        </form>
        <Button
          asChild
          className="bg-secondary leading-none w-full h-13 py-5 self-center font-medium text-lg mt-2"
        >
          <Link href={"/signup"}>회원가입 하기</Link>
        </Button>
        <hr className="my-5 border-t border-gray-300" />
        <SocialLogin />
      </div>
    </div>
  );
}
