import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/auth";

const protectedRoutes = ["/dashboard"];

const authRoutes = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const pathname = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.includes(pathname);

  if (token) {
    const verified = await verifyToken(token);

    if (!verified) {
      const response = NextResponse.redirect(
        new URL("/login", req.url)
      );

      response.cookies.delete("token");

      return response;
    }

    if (isAuthRoute) {
      return NextResponse.redirect(
        new URL("/dashboard", req.url)
      );
    }
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};
