"use client";

import Sidebar from "@/components/common/Sidebar";
import BottomNav from "@/components/common/BottomNav";
import { usePathname } from "next/navigation";

export default function NavWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavPaths = ["/", "/login", "/signup"];
  const isNavHidden = hideNavPaths.includes(pathname);
  if (isNavHidden) {
    return <div className="w-full min-h-screen">{children}</div>;
  }
  return (
    <>
      <Sidebar />
      <BottomNav />
      <div className="pt-16 md:ml-64 min-h-screen">
        <main className="flex-1 pb-20 md:pb-10 px-4 max-w-4xl mx-auto w-full">
          {children}
        </main>
      </div>
    </>
  );
}
