"use client";

import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full max-w-[500px]">
      <Input
        className="border-foreground placeholder:text-muted-foreground w-full h-10 px-5"
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호를 입력해주세요"
      />

      <button
        className="absolute top-1/2 right-3 -translate-y-1/2"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <Eye /> : <EyeClosed />}
      </button>
    </div>
  );
}
