import LoginForm from "@/components/auth/LoginForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-10">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="p-4">
      <Suspense fallback={<FormSkeleton />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
