import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/auth/PasswordInput";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  return (
    <div className="max-w-[600px] w-full mx-auto flex justify-center min-h-screen -mt-10 flex-col items-center">
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
        <form className="mt-6 flex flex-col justify-center gap-5 w-full">
          <Input
            className="border-foreground placeholder:text-muted-foreground h-10 px-5"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
          <PasswordInput />
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">로그인 상태 유지</Label>
          </div>
          <Button className="leading-none w-full h-13 py-5 self-center font-medium text-lg mt-2">
            로그인 하기
          </Button>
        </form>
        <hr className="my-5 border-t border-gray-300" />
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
}
