"use client";

import { useEffect, useState } from "react";
import { useGetProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useRef } from "react";

export default function ProfileEdit({ userId }: { userId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { profile } = useGetProfile(userId);
  const { mutate: updateProfile, isPending } = useUpdateProfile(userId);

  const [nickname, setNickname] = useState("");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname);
      setRegion(profile.region ?? "");
      setGender(profile.gender);
    }
  }, [profile]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProfile({
      userId,
      profileUpdate: { nickname, region, gender },
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-10 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-jua text-xl">내 정보</h3>
      </div>

      <div className="flex flex-col gap-2">
        <label>닉네임</label>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          readOnly={!isEditing}
          className="rounded-lg border px-3 py-2"
          onClick={() => setIsEditing(true)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>지역</label>
        <input
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          readOnly={!isEditing}
          className="rounded-lg border px-3 py-2"
          onClick={() => setIsEditing(true)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>성별</label>
        <input
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          readOnly={!isEditing}
          className="rounded-lg border px-3 py-2"
          onClick={() => setIsEditing(true)}
        />
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
