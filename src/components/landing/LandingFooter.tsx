"use client";

export default function LandingFooter() {
  const handleAlert = (title: string) => {
    alert(`${title} 페이지는 현재 준비 중입니다.`);
  };

  return (
    <footer className="bg-primary py-8 px-4 text-stone-800 text-xs">
      <div className="max-w-4xl mx-auto flex flex-col gap-4 items-center text-center">
        <div className="flex gap-4 font-medium">
          <button
            onClick={() => handleAlert("개인정보처리방침")}
            className="font-bold hover:underline cursor-pointer"
          >
            개인정보처리방침
          </button>
          <span>|</span>
          <button
            onClick={() => handleAlert("이용약관")}
            className="hover:underline cursor-pointer"
          >
            이용약관
          </button>
          <span>|</span>
          <button
            onClick={() => handleAlert("고객센터")}
            className="hover:underline cursor-pointer"
          >
            고객센터
          </button>
        </div>

        <div className="text-stone-700 leading-relaxed">
          <p>
            <strong>댕메이트</strong> | 대표: 윤지원 | 이메일:
            support@dangmate.com
          </p>
          <p>서울특별시 강남구 테헤란로 123 | 사업자등록번호: 000-00-00000</p>
        </div>

        <p className="text-stone-600 mt-2">
          © 2026 댕메이트. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
