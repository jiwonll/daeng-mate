"use client";

import MateCard from "@/components/mates/MateCard";
import { useMatePosts } from "@/hooks/useMatePosts";
import { useMateFilterStore } from "@/stores/useMateFilterStore";

export default function MateList() {
  const { matePosts } = useMatePosts();
  const { sizeFilter, searchTerm, statusFilter } = useMateFilterStore();
  const term = searchTerm.toLowerCase().trim();
  const filteredPosts = matePosts?.filter((post) => {
    const dog = post.profiles?.dogs;
    const weight = Number(dog?.size) || 0;

    const matchesSearch =
      !term ||
      post.title.includes(term) ||
      post.content?.includes(term) ||
      post.meeting_place?.includes(term);

    let matchesSize = true;
    if (sizeFilter === "under5") matchesSize = weight < 5;
    else if (sizeFilter === "5to10") matchesSize = weight >= 5 && weight < 10;
    else if (sizeFilter === "10to20") matchesSize = weight < 20 && weight >= 10;
    else if (sizeFilter === "over20") matchesSize = weight > 20;
    let matchesStatus = true;
    if (statusFilter == "open") matchesStatus = post.status === "recruiting";
    return matchesSearch && matchesSize && matchesStatus;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {filteredPosts?.map((post) => {
        return <MateCard key={post.id} post={post} />;
      })}
    </div>
  );
}
