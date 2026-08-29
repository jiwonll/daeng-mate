import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 비로그인 유저가 접근할 수 있는 공개 페이지 목록 (예: 로그인, 회원가입 등)
  const isPublicPage =
    pathname.startsWith("/login") || pathname.startsWith("/auth");

  // 로그인 안 했는데 로그인 필요 페이지로 들어오면 바로 /login으로 튕겨냄
  if (!user && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 이미 로그인했는데 /login 페이지로 접근하면 메인(/)으로 보내버림
  if (user && isPublicPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

// 미들웨어가 실행될 경로 설정 (정적 파일, 이미지 등은 제외)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
