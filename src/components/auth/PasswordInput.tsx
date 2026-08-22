"use client";

import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState, ComponentPropsWithoutRef } from "react";

type PasswordInputProps = ComponentPropsWithoutRef<"input">;

export default function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full">
      <Input
        className="border-foreground placeholder:text-muted-foreground w-full h-10 px-5"
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호를 입력해주세요"
        required
        {...props}
      />

      <button
        type="button"
        className="absolute top-1/2 right-3 -translate-y-1/2"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={props.disabled}
      >
        {showPassword ? (
          <Eye className="w-10" />
        ) : (
          <EyeClosed className="w-10" />
        )}
      </button>
    </div>
  );
}
