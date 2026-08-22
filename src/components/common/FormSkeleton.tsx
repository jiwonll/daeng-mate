import { Skeleton } from "../ui/skeleton";

export default function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-10">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
