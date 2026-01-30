import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/repurpose",
  "/outputs",
  "/templates",
  "/brand-voice",
  "/projects",
  "/team",
  "/billing",
  "/settings",
];

// Auth routes that should redirect to dashboard if already logged in
const authRoutes = ["/login", "/register", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for session token (NextAuth sets this cookie)
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value;

  const isLoggedIn = !!sessionToken;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect to login if accessing protected route while not logged in
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing auth route while logged in
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match protected and auth routes
    "/dashboard/:path*",
    "/repurpose/:path*",
    "/outputs/:path*",
    "/templates/:path*",
    "/brand-voice/:path*",
    "/projects/:path*",
    "/team/:path*",
    "/billing/:path*",
    "/settings/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
