import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const userType = token ? decodeToken(token.value)?.userType : null;

  const protectedRoutes = {
    "/dashboard": ["employer"],
    "/seekers": ["employer"],
    "/dashboard/jobs": ["employer"],
    "/dashboard/jobs/new": ["employer"],
    "/dashboard/jobs/jobId/edit": ["employer"],
    "/dashboard/settings": ["employer"],
    "/": ["seeker"],
    "/jobs/jobId": ["seeker"],
    "/seeker": ["seeker"],
    "/companies": ["seeker"],
    "/profile": ["seeker"],
    "/companies/seekerId": ["seeker"],
    "/companies/companyId/review": ["seeker"],
  };

  const pathname = req.nextUrl.pathname;

  // Handle case where token is missing, redirect to login page
  if (!token) {
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // Check if the current path is protected and the user has the required role
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      if (!roles.includes(userType)) {
        const redirectUrl = userType === "employer" ? "/seekers" : "/";
        if (pathname !== redirectUrl) {
          return NextResponse.redirect(new URL(redirectUrl, req.url));
        }
      }
    }
  }

  return NextResponse.next();
}

function decodeToken(token: string): any {
  return jwtDecode(token);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/seekers",
    "/profile",
    "/companies/:path*",
    "/jobs/:path*",
    "/",
  ],
};
