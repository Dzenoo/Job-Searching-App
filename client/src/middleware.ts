import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const userType = token ? decodeToken(token.value).userType : null;

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

  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (!roles.includes(userType)) {
        return NextResponse.redirect(
          new URL(userType === "employer" ? "/seekers" : "/", req.url)
        );
      }
    }
  }

  return NextResponse.next();
}

function decodeToken(token: string): any {
  return jwtDecode(token);
}
