"use client";

import { useGetDog, useUpdateDog } from "@/hooks/useDog";
import { Edit } from "lucide-react";

export default function DogManagement({ userId }: { userId: string }) {
  const { dog, isLoading } = useGetDog(userId);
  const dogId = dog?.id;
  const { mutate: updateDog, isPending } = useUpdateDog();

  return (
    <div>
      <div className="flex p-10 border-2 border-slate-100 bg-white rounded-2xl gap-10 shadow-sm items-center">
        <div className="relative w-50 h-50 flex-shrink-0">
          <img
            alt="강아지 사진"
            src={dog?.photo_url || "/images/dog-logo.svg"}
            className="w-full h-full object-contain border-1 rounded-2xl border-amber-200"
          />
          <button
            type="button"
            className="absolute p-2 right-2 bottom-2 cursor-pointer bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl shadow-md transition-all"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col font-jua text-lg gap-3 text-slate-800">
          <div>
            이름:
            <span
              className="ml-2 font-light text-primary
            "
            >
              {dog?.name || "-"}
            </span>
          </div>
          <div className="flex gap-10">
            <div>
              나이:
              <span className="ml-2 font-light text-primary">
                {dog?.age ? `${dog.age}살` : "-"}
              </span>
            </div>
            <div>
              생일:
              <span
                className="ml-2 font-light text-primary
              "
              >
                {dog?.birth || "-"}
              </span>
            </div>
          </div>
          <div>
            종:
            <span
              className="ml-2 font-light text-primary
            "
            >
              {dog?.breed || "-"}
            </span>
          </div>
          <div>
            성별:
            <span
              className="ml-2 font-light text-primary
            "
            >
              {dog?.personality || "-"}
            </span>
          </div>
          <div>
            중성화 여부:
            <span
              className="ml-2 font-light text-primary
            "
            >
              {dog?.neutered ? "완료" : "미완료"}
            </span>
          </div>
          <div>
            무게:
            <span
              className="ml-2 font-light text-primary
            "
            >
              {dog?.size ? `${dog.size}kg` : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
