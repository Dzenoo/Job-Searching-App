import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { decodeToken } from "./lib/utils";

const protectedRoutes = {
  "/dashboard": ["employer"],
  "/seekers": ["employer"],
  "/dashboard/jobs": ["employer"],
  "/dashboard/jobs/new": ["employer"],
  "/dashboard/jobs/jobId/edit": ["employer"],
  "/dashboard/settings": ["employer"],
  "/jobs/jobId": ["seeker"],
  "/companies": ["seeker"],
  "/profile": ["seeker"],
  "/companies/seekerId": ["seeker"],
  "/companies/companyId/review": ["seeker"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const userType = token ? decodeToken(token.value)?.userType : null;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    return handleUnauthenticatedAccess(pathname, req);
  }

  if (isAuthPage(pathname)) {
    return redirectLoggedInUser(userType, req);
  }

  if (pathname === "/" && userType === "employer") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return handleProtectedRoutes(pathname, userType, req);
}

function handleUnauthenticatedAccess(pathname: string, req: NextRequest) {
  if (isAuthPage(pathname)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.url));
}

function isAuthPage(pathname: string) {
  return (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verify-email" ||
    pathname === "/check-your-email"
  );
}

function redirectLoggedInUser(userType: string, req: NextRequest) {
  const redirectUrl = userType === "employer" ? "/dashboard" : "/";
  return NextResponse.redirect(new URL(redirectUrl, req.url));
}

function handleProtectedRoutes(
  pathname: string,
  userType: string,
  req: NextRequest
) {
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route) && !roles.includes(userType)) {
      const redirectUrl = userType === "employer" ? "/seekers" : "/";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/verify-email",
    "/check-your-email",
    "/dashboard/:path*",
    "/seekers",
    "/profile",
    "/companies/:path*",
    "/jobs/:path*",
    "/",
  ],
};
