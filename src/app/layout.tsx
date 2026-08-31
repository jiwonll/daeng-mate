import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";
import NavWrapper from "@/components/common/NavWrapper";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/tanstack-query/provider";
const jua = Jua({
  variable: "--font-jua",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "댕메이트",
  description: "우리 동네 강아지 산책 메이트",
  openGraph: {
    title: "댕메이트 - 동네 산책 친구 찾기",
    description: "우리 동네 강아지 산책 메이트를 찾아보세요!",
    images: ["/images/dog-meta.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${jua.variable} h-full antialiased`}>
      <body className="h-full bg-gray-50 font-sans">
        <QueryProvider>
          <div className="flex flex-col min-h-screen">
            <NavWrapper>{children}</NavWrapper>
          </div>
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
