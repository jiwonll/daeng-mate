"use client";

import Link from "next/link";
import { ChevronRight, PawPrint } from "lucide-react";
import { useMatePosts } from "@/hooks/useMatePosts";
export default function NearbyMateSection() {
  const { matePosts, isLoading, isError } = useMatePosts();
  const recentMatePosts = matePosts?.slice(0, 4) || [];
  return (
    <div>
      <Link className="flex items-center mb-5" href="/mates">
        <h3 className="font-semibold text-xl">
          <span className="text-primary">댕댕이</span> 산책 메이트
          <span className="text-primary"> 모집중</span>
        </h3>
        <ChevronRight className="text-muted-foreground group-hover:translate-x-0.5 transition-transform w-6 h-6"></ChevronRight>
      </Link>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {recentMatePosts.map((post) => (
          <div
            key={post.id}
            className="flex-shrink-0 w-[320px] p-5 border border-border rounded-2xl bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary transition-all snap-start flex flex-col justify-between space-y-4 cursor-pointer group"
          >
            <div className="relative w-full h-40 rounded-xl bg-muted overflow-hidden flex items-center justify-center shrink-0">
              {post.profiles?.dogs?.photo_url ? (
                <img
                  src={post.profiles.dogs.photo_url}
                  alt={post.profiles.dogs.name ?? "강아지 사진"}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-muted-foreground/50">
                  <PawPrint className="w-8 h-8" />
                  <span className="text-xs">사진 없음</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <h4 className="font-semibold text-lg line-clamp-1 leading-snug">
                {post.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {post.content ?? "내용이 없습니다."}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5 truncate">
                <PawPrint className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="font-medium text-foreground truncate">
                  {post.profiles?.dogs?.name ?? "강아지 미등록"}
                </span>
                {post.profiles?.dogs?.breed && (
                  <span className="text-muted-foreground/70 truncate">
                    ({post.profiles.dogs.breed})
                  </span>
                )}
              </div>
              <span className="shrink-0 text-muted-foreground/80">
                {post.profiles?.nickname ?? "익명"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
