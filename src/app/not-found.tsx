import Link from "next/link";

export default function NotFoundUI() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>페이지를 찾을 수 없습니다 (404)</h2>
      <Link href="/">메인으로 돌아가기</Link>
    </div>
  );
}
