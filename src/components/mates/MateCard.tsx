"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MatePostWithDog } from "@/types/mate-post";
import { formatMeetingTime } from "@/utils/date";

export default function MateCard({ post }: { post: MatePostWithDog }) {
  const isClosed = post.status === "closed";
  const dog = post.profiles?.dogs;

  return (
    <Link href={`/mates/${post.id}`} key={post.id} className="group block">
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-200 flex flex-col justify-between h-full min-h-[260px]">
        <div className="flex items-start gap-4 sm:gap-5 mb-4">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-amber-50 border border-gray-100 shrink-0 shadow-inner">
            {dog?.photo_url ? (
              <Image
                src={dog.photo_url}
                alt={dog.name || "강아지"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">
                🐶
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 py-0.5">
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              <Badge
                variant={isClosed ? "secondary" : "default"}
                className={
                  isClosed
                    ? "bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs px-2.5 py-0.5"
                    : "bg-amber-400 text-gray-900 hover:bg-amber-500 font-bold text-xs px-2.5 py-0.5"
                }
              >
                {isClosed ? "모집 마감" : "모집 중"}
              </Badge>
            </div>
            <div className="flex mb-2 gap-1">
              {dog?.breed && (
                <span className="font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md text-xs">
                  {dog.breed}
                </span>
              )}

              {dog?.size && (
                <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md text-xs">
                  {dog.size}kg
                </span>
              )}

              {dog?.age && (
                <span className="font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md text-xs">
                  {dog?.age ? `${dog.age}살 ` : " "}
                  {dog?.gender}
                </span>
              )}

              {dog?.neutered && (
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  중성화
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 group-hover:text-amber-600 transition-colors truncate mb-1.5">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed font-normal">
              {post.content}
            </p>
          </div>
        </div>

        {dog?.personality && (
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-amber-900 bg-amber-50/90 px-3 py-1.5 rounded-xl mb-4 w-fit border border-amber-100/60">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-semibold truncate max-w-[300px]">
              {dog.personality}
            </span>
          </div>
        )}

        <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-gray-600 gap-2">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-semibold text-gray-800 truncate max-w-[100px] sm:max-w-[140px]">
                {post.meeting_place || "장소 미정"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-medium">
                {formatMeetingTime(post.meeting_time) || "날짜 미정"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
            <span className="font-bold text-gray-800 truncate max-w-[80px]">
              {dog?.name || "익명"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
