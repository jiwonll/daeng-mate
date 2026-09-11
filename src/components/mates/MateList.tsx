"use client";

import MateCard from "@/components/mates/MateCard";
import { useMatePosts } from "@/hooks/useMatePosts";

export default function MateList() {
  const { matePosts } = useMatePosts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {matePosts?.map((post) => {
        return <MateCard key={post.id} post={post} />;
      })}
    </div>
  );
}
