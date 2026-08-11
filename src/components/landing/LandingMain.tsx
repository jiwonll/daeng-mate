import { Button } from "@/components/ui/button";
import useNavigateByAuth from "@/hooks/useNavigateByAuth";

export default function LandingMain() {
  const handleStartClick = () => {
    // Handle the button click event here
    const navigate = useNavigateByAuth();
    return navigate;
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4 pt-10 pb-10">
      <h1 className="text-3xl md:text-5xl font-bold font-jua pt-10 text-center">
        반려견과 함께
        <br /> 더 즐거운 산책
      </h1>
      <span>
        실시간 산책 기록과 동네 메이트 매칭으로 더 행복한 산책을 경험하세요
      </span>
      <Button className="font-jua" onClick={handleStartClick}>
        지금 시작하기
      </Button>
      <img
        className="w-96 -mt-25"
        src="/images/dog-landing.svg"
        alt="댕메이트 메인 이미지"
      />
    </section>
  );
}
