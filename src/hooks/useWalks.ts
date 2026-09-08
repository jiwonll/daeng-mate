"use client";

import { getWalk } from "@/services/walk";
import { useQuery } from "@tanstack/react-query";

export default function useWalks() {
  const {
    data: walks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["walk"],
    queryFn: getWalk,
  });
  return { walks, isLoading, isError };
}
