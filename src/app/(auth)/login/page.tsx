import LoginForm from "@/components/auth/LoginForm";
import FormSkeleton from "@/components/common/FormSkeleton";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main>
      <Suspense fallback={<FormSkeleton />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
