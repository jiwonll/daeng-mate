import SignupForm from "@/components/auth/SignupForm";

import FormSkeleton from "@/components/common/FormSkeleton";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <main>
      <Suspense fallback={<FormSkeleton />}>
        <SignupForm />
      </Suspense>
    </main>
  );
}
