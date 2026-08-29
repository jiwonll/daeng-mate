import Link from "next/link";
import { NAV_ITEMS } from "@/constants/NAV_ITEMS";

export default function BottomNav() {
  const renderIcon = (Icon: any, active: boolean) => {
    if (typeof Icon === "function" || typeof Icon === "object") {
      return (
        <Icon
          className={`w-6 h-6 ${active ? "text-yellow-500" : "text-gray-400"}`}
        />
      );
    }
    return <span className="text-xl">{Icon}</span>;
  };

  const leftItems = NAV_ITEMS.slice(0, 2); // 홈, 산책
  const rightItems = NAV_ITEMS.slice(2, 4); // 메이트, 마이

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 z-30 flex items-center justify-around md:hidden">
      {leftItems.map((item) => (
        <Link
          key={item.id}
          href={`/${item.id === "home" ? "" : item.id}`}
          className={`flex flex-col items-center justify-center w-14 ${
            item.active ? "text-yellow-500 font-bold" : "text-gray-400"
          }`}
        >
          {renderIcon(item.icon, item.active)}
          <span className="text-xs mt-1">{item.name}</span>
        </Link>
      ))}

      <div className="relative -top-5 flex items-center justify-center">
        <Link
          href="/write"
          className="w-14 h-14 rounded-full bg-yellow-400 text-white text-3xl flex items-center justify-center shadow-lg border-4 border-white active:scale-95 transition-transform"
        >
          +
        </Link>
      </div>

      {rightItems.map((item) => (
        <Link
          key={item.id}
          href={`/${item.id}`}
          className={`flex flex-col items-center justify-center w-14 ${
            item.active ? "text-yellow-500 font-bold" : "text-gray-400"
          }`}
        >
          {renderIcon(item.icon, item.active)}
          <span className="text-xs mt-1">{item.name}</span>
        </Link>
      ))}
    </footer>
  );
}
