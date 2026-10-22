"use client";

import { useEffect, useRef } from "react";
import type { LocationPoint } from "@/types/walk";

declare global {
  interface Window {
    kakao: any;
  }
}

type KakaoMapProps = {
  route: LocationPoint[];
  isTracking: boolean;
};

const getPrimaryColor = () =>
  getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim() || "#FFC83D";

export default function KakaoMap({ route, isTracking }: KakaoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);

  useEffect(() => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

    if (!appKey) {
      console.error("카카오맵 API 키가 없습니다.");
      return;
    }

    const loadKakaoMap = () => {
      if (!window.kakao?.maps) return;

      window.kakao.maps.load(() => {
        if (!mapContainerRef.current) return;

        const defaultPosition = new window.kakao.maps.LatLng(37.5665, 126.978);

        const map = new window.kakao.maps.Map(mapContainerRef.current, {
          center: defaultPosition,
          level: 3,
        });

        mapRef.current = map;

        markerRef.current = new window.kakao.maps.Marker({
          position: defaultPosition,
          map,
        });

        polylineRef.current = new window.kakao.maps.Polyline({
          map,
          path: [],
          strokeWeight: 5,
          strokeColor: getPrimaryColor(),
          strokeOpacity: 0.9,
          strokeStyle: "solid",
        });
      });
    };

    if (window.kakao?.maps) {
      loadKakaoMap();
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com/v2/maps/sdk.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", loadKakaoMap);
      return () => {
        existingScript.removeEventListener("load", loadKakaoMap);
      };
    }

    const script = document.createElement("script");

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.async = true;
    script.addEventListener("load", loadKakaoMap);

    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", loadKakaoMap);
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current || !polylineRef.current) return;
    if (route.length === 0) return;

    const path = route.map(
      (point) => new window.kakao.maps.LatLng(point.lat, point.lng)
    );

    const lastPoint = path[path.length - 1];

    markerRef.current.setPosition(lastPoint);
    polylineRef.current.setPath(path);

    if (isTracking) {
      mapRef.current.panTo(lastPoint);
    }
  }, [route, isTracking]);

  return (
    <div className="h-[400px] w-full overflow-hidden rounded-2xl border border-border">
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
}
