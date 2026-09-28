"use client";

import { useState, useEffect } from "react";
import { EyeClosed, Eye } from "lucide-react";
import {
  useGetEmail,
  useUpdateEmail,
  useUpdatePassword,
} from "@/hooks/useProfile";

import { toast } from "sonner";

export default function PasswordChangeForm() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const { data: currentEmail, isPending } = useGetEmail();
  const { mutateAsync: updateEmail } = useUpdateEmail();
  const { mutateAsync: updatePassword } = useUpdatePassword();

  useEffect(() => {
    if (currentEmail) {
      setEmail(currentEmail);
    }
  }, [currentEmail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailChanged = email.trim() !== "" && email !== currentEmail;
    const isPasswordChanged = password.trim() !== "";

    if (!isEmailChanged && !isPasswordChanged) {
      toast.error("변경할 이메일이나 비밀번호를 입력해 주세요.");
      return;
    }

    if (isPasswordChanged) {
      if (password !== confirmPassword) {
        toast.error("새 비밀번호 확인이 일치하지 않습니다.");
        return;
      }
    }

    try {
      if (isEmailChanged) {
        console.log("현재 currentEmail:", currentEmail);
        console.log("변경할 email:", email);
        await updateEmail(email.trim());
      }

      if (isPasswordChanged) {
        await updatePassword({
          email: currentEmail || "",
          currentPassword: currentPassword,
          newPassword: password,
        });
        setPassword("");
        setConfirmPassword("");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-10 shadow-sm"
    >
      <div>
        <h3 className="font-jua text-xl">내 계정</h3>
      </div>

      <div className="flex flex-col gap-2">
        <label>이메일</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={!isEditing}
          className="rounded-lg border px-3 py-2"
          onClick={() => setIsEditing(true)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>기존 비밀번호</label>
        <div className="relative flex items-center">
          <input
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            readOnly={!isEditing}
            className="w-full rounded-lg border px-3 py-2 pr-10"
            onClick={() => setIsEditing(true)}
            type={showCurrentPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword((prev) => !prev)}
            className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            {showCurrentPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label>새 비밀번호</label>
        <div className="relative flex items-center">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly={!isEditing}
            className="w-full rounded-lg border px-3 py-2 pr-10"
            onClick={() => setIsEditing(true)}
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label>새 비밀번호 확인</label>
        <div className="relative flex items-center">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            readOnly={!isEditing}
            className="w-full rounded-lg border px-3 py-2 pr-10"
            onClick={() => setIsEditing(true)}
            type={showConfirmPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          </button>
        </div>
      </div>
      {isEditing && (
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#ffc83d] px-4 py-2 font-semibold"
        >
          {isPending ? "수정 중..." : "수정하기"}
        </button>
      )}
    </form>
  );
}
