import Sidebar from "@/components/common/Sidebar";
import BottomNav from "@/components/common/BottomNav";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
