"use client";

import { getDog } from "@/services/dogs";
import { useQuery } from "@tanstack/react-query";
import { PawPrint } from "lucide-react";
export default function MainContent() {
  const { data: dog, isLoading } = useQuery({
    queryKey: ["dog"],
    queryFn: getDog,
  });

  if (isLoading) {
    return (
      <div className="mt-6 w-full rounded-2xl bg-amber-50 p-5 animate-pulse">
        <div className="h-5 w-20 bg-amber-200/60 rounded mb-4" />
        <div className="flex gap-4 items-center">
          <div className="w-24 h-24 bg-amber-200/60 rounded-xl" />
          <div className="space-y-2 flex-1">
            <div className="h-6 w-24 bg-amber-200/60 rounded" />
            <div className="h-4 w-32 bg-amber-200/60 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 w-150">
      <div className="flex gap-2 ">
        <h3 className="font-semibold text-2xl text-gray-900 mb-5 font-jua">
          내<span className="text-primary"> 댕댕이</span>
        </h3>
        <PawPrint />
      </div>
      <div className="flex flex-col gap-3 rounded-2xl bg-amber-50 p-5 shadow-sm border border-amber-100">
        <div className="flex items-center gap-10">
          <div className="w-50 h-50 flex-shrink-0 rounded-xl overflow-hidden bg-amber-100 border border-amber-200">
            <img
              alt="강아지 사진"
              src={(dog?.photo_url as string) || "/images/dog-meta.png"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col font-jua justify-center gap-3">
            <span className="font-medium text-2xl text-gray-900">
              {dog?.name ?? "이름 없음"}
            </span>

            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-600">
              <span className="bg-amber-100/80 text-amber-900 px-2 py-0.5 rounded-md">
                {dog?.gender ?? "성별"}
              </span>
              <span className=" bg-amber-100/80 text-amber-900 px-2 py-0.5 rounded-md">
                {dog?.age ? `${dog.age}살` : "나이 미지정"}
              </span>
              <span className="bg-amber-100/80 text-amber-900 px-2 py-0.5 rounded-md">
                {dog?.breed ?? "품종 미지정"}
              </span>
              <span className="bg-amber-100/80 text-amber-900 px-2 py-0.5 rounded-md">
                {dog?.size ? `${dog.size}kg` : "무게 미지정"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
