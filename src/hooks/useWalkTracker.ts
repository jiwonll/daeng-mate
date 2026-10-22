"use client";

import { useEffect, useRef, useState } from "react";
import { calculateDistance } from "@/utils/geo";
import type { LocationPoint } from "@/types/walk";
import { useCreateWalk } from "@/hooks/useWalks";
import { toast } from "sonner";

export function useWalkTracker(userId: string) {
  const [isWalking, setIsWalking] = useState(false);
  const [walkingPostId, setWalkingPostId] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [distance, setDistance] = useState(0);
  const [route, setRoute] = useState<LocationPoint[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastPointRef = useRef<LocationPoint | null>(null);
  const endedAtRef = useRef<Date | null>(null);
  const { createWalk, isSaving } = useCreateWalk();

  const releaseTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return releaseTracking;
  }, []);

  const reset = () => {
    setIsWalking(false);
    setWalkingPostId(null);
    setSeconds(0);
    setDistance(0);
    setRoute([]);
    setStartTime(null);
    endedAtRef.current = null;
  };

  const start = (postId: string | null = null) => {
    if (!navigator.geolocation) {
      toast.error("이 브라우저는 GPS를 지원하지 않아요.");
      return;
    }

    setIsWalking(true);
    setWalkingPostId(postId);
    setIsTracking(true);
    setSeconds(0);
    setDistance(0);
    setRoute([]);
    setStartTime(new Date());

    lastPointRef.current = null;
    endedAtRef.current = null;

    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const point: LocationPoint = { lat, lng, timestamp: Date.now() };
        const last = lastPointRef.current;

        if (!last) {
          lastPointRef.current = point;
          setRoute([point]);
          return;
        }

        const added = calculateDistance(last.lat, last.lng, lat, lng);

        if (added > 3) {
          lastPointRef.current = point;
          setDistance((d) => d + added);
          setRoute((prev) => [...prev, point]);
        }
      },
      (error) => {
        console.error("GPS Error:", error);

        if (error.code === error.PERMISSION_DENIED) {
          releaseTracking();
          setIsTracking(false);
          setIsWalking(false);
          setWalkingPostId(null);
          toast.error("위치 권한을 허용해야 산책을 기록할 수 있어요.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const stop = async () => {
    if (!isWalking) return;

    if (isTracking && !confirm("산책을 종료하고 기록을 저장하시겠습니까?")) {
      return;
    }

    releaseTracking();
    setIsTracking(false);

    const endedAt = endedAtRef.current ?? new Date();
    endedAtRef.current = endedAt;

    try {
      await createWalk({
        user_id: userId,
        post_id: walkingPostId,
        distance: Number((distance / 1000).toFixed(2)),
        duration: seconds,
        route_path: route,
        started_at: startTime?.toISOString(),
        ended_at: endedAt.toISOString(),
      });
    } catch {
      // 상태를 유지해서 "기록 다시 저장하기"로 재시도할 수 있게 함
      return;
    }

    toast.success("산책 기록이 저장되었어요.");
    reset();
  };

  return {
    isWalking,
    walkingPostId,
    isTracking,
    isSaving,
    seconds,
    distance,
    route,
    start,
    stop,
  };
}
