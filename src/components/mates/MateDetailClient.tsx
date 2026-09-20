"use client";

import { Button } from "@/components/ui/button";
import { useMatePosts } from "@/hooks/useMatePosts";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  User,
  Sparkles,
  ShieldCheck,
  MapPin,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useMateParticipate } from "@/hooks/useMateParticipate";
import { MatePostRow } from "@/types/mate-post";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function MateDetailClient() {
  const { matePosts } = useMatePosts();
  const { user } = useUser();
  const {
    sentParticipations,
    updateParticipate,
    deleteParticipate,
    isDeleting,
    isUpdating,
  } = useMateParticipate(user?.id || "");
  const isPending = isDeleting || isUpdating;

  const params = useParams();
  const postId = params.id as string;
  const post = matePosts?.find((p) => p.id === postId);
  if (!post) {
    return;
  }
  const isClosed = post.status === "closed";
  const dog = post.profiles?.dogs;
  const isParticipating = sentParticipations.some(
    (p) =>
      (p.status === "pending" || p.status === "approved") &&
      p.post_id === post.id
  );
  const handleUpdateParticipation = (post: MatePostRow) => {
    if (!user?.id) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    updateParticipate({ userId: user?.id, postId: post.id });
  };
  const handleCancelParticipation = (post: MatePostRow) => {
    if (!user?.id) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    deleteParticipate({ userId: user?.id, postId: post.id });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10 space-y-6 pb-28 sm:pb-10">
      <div className="flex items-center justify-between">
        <Link
          href="/mates"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로 돌아가기
        </Link>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("URL이 복사되었습니다!", {
              description: "친구에게 공유해보세요.",
            });
          }}
          className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          title="공유하기"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-5 border border-gray-100 shadow-sm space-y-4 sm:space-y-4">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-amber-50 border border-amber-100/80 shadow-inner">
              {dog?.photo_url ? (
                <Image
                  src={dog.photo_url}
                  alt={dog.name || "강아지 사진"}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🐶
                </div>
              )}
            </div>

            {dog && (
              <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-100 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-gray-900">
                      {dog.name || "익명"}
                    </span>

                    {dog.breed && (
                      <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-md">
                        {dog.breed}
                      </span>
                    )}
                  </div>

                  {dog.size && (
                    <span className="text-xs font-semibold text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-100">
                      {dog.size}kg
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-700">
                  {dog.age && (
                    <span className="bg-white px-2 py-0.5 rounded border border-amber-100">
                      {dog.age}살
                    </span>
                  )}

                  {dog.gender && (
                    <span className="bg-white px-2 py-0.5 rounded border border-amber-100">
                      {dog.gender}
                    </span>
                  )}

                  {dog.neutered && (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      중성화 완료
                    </span>
                  )}
                </div>

                {dog.personality && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-900 bg-white p-2.5 rounded-xl border border-amber-200/60">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="font-semibold">{dog.personality}</span>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-amber-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] text-gray-400 font-medium">
                    산책 장소
                  </p>

                  <p className="text-sm font-bold text-gray-800 truncate">
                    {post.meeting_place || "장소 미정"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-amber-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] text-gray-400 font-medium">
                    산책 일시
                  </p>

                  <p className="text-sm font-bold text-gray-800 truncate">
                    {post.meeting_time
                      ? new Date(post.meeting_time).toLocaleString("ko-KR", {
                          month: "long",
                          day: "numeric",
                          weekday: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "일시 미정"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 min-h-[460px] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <Badge
                  variant={isClosed ? "secondary" : "default"}
                  className={
                    isClosed
                      ? "bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs px-3 py-1 font-bold"
                      : "bg-amber-400 text-gray-900 hover:bg-amber-500 font-bold text-xs px-3 py-1"
                  }
                >
                  {isClosed ? "모집 마감" : "모집 중"}
                </Badge>

                <span className="text-xs text-gray-400 font-medium">
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
                  {post.title}
                </h1>

                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap font-normal min-h-[120px]">
                  {post.content || "본문 내용이 없습니다."}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500">
                    <User className="w-5 h-5" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">작성자</p>

                    <p className="text-sm font-bold text-gray-800">
                      {post.profiles?.nickname || "익명 보호자"}
                      {post.profiles?.gender === "여" ? " (여)" : " (남)"}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block">
                  <Button
                    size="lg"
                    disabled={isClosed || isPending}
                    className={
                      isClosed
                        ? "w-full bg-gray-200 text-gray-500 font-semibold rounded-2xl h-13 text-base"
                        : "w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-extrabold rounded-2xl h-13 text-base shadow-md gap-2"
                    }
                    onClick={() => {
                      if (isParticipating) {
                        handleCancelParticipation(post);
                      } else {
                        handleUpdateParticipation(post);
                      }
                    }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {isClosed
                      ? "모집이 마감되었습니다"
                      : isParticipating
                        ? "산책 취소하기"
                        : "산책 신청하기"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-50">
        <Button
          size="lg"
          disabled={isClosed || isPending}
          className={
            isClosed
              ? "w-full bg-gray-200 text-gray-500 font-semibold rounded-2xl h-12 text-sm"
              : "w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-extrabold rounded-2xl h-12 text-sm shadow-md gap-2"
          }
          onClick={() => {
            if (isParticipating) {
              handleCancelParticipation(post);
            } else {
              handleUpdateParticipation(post);
            }
          }}
        >
          <MessageCircle className="w-5 h-5" />
          {isClosed
            ? "모집이 마감되었습니다"
            : isParticipating
              ? "산책 신청 취소"
              : "산책 신청하기"}
        </Button>
      </div>
    </div>
  );
}
