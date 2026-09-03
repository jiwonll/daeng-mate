import Link from "next/link";
import { NAV_ITEMS } from "@/constants/NAV_ITEMS";
import Image from "next/image";
import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";
import { Settings } from "lucide-react";

export default function Sidebar() {
  const { handleLogout, isPending } = useLogout();
  const renderIcon = (Icon: any, active: boolean) => {
    if (typeof Icon === "function" || typeof Icon === "object") {
      return (
        <Icon
          className={`w-6 h-6 ${active ? "text-yellow-600" : "text-gray-500"}`}
        />
      );
    }
    return <span className="text-2xl">{Icon}</span>;
  };

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-30 flex-col justify-between p-6">
      <div className="space-y-8">
        <Link
          href="/"
          className="flex items-center leading-none space-x-2 px-2"
        >
          <Image
            src="/images/dog-logo.svg"
            alt="댕메이트 로고"
            width={100}
            height={100}
          />
          <span className="-ml-5 -mb-3 text-3xl font-extrabold font-jua text-primary">
            댕메이트
          </span>
        </Link>

        <Link
          href="/write"
          className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center space-x-2 transition-colors"
        >
          <span className="text-xl">+</span>
          <span>산책 메이트 찾기</span>
        </Link>

        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`/${item.id === "home" ? "" : item.id}`}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-colors ${
                item.active
                  ? "bg-yellow-50 text-yellow-600 font-bold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {renderIcon(item.icon, item.active)}
              <span className="text-base">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="pt-6 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
        {/* <Link
          href={"/profile"}
          className="flex items-center gap-2 text-sm text-gray-500"
        > */}
        <Settings className="w-6 h-6" />
        <span className="font-jua">내 계정</span>
        {/* </Link> */}
        <Button className="h-10" onClick={() => handleLogout()}>
          {isPending ? "로그아웃 중" : "로그아웃"}
        </Button>
      </div>
    </aside>
  );
}
