import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getJWT_Secret_Key } from "./utils/apiUtils";

export async function middleware(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    if (!accessToken) {
      return NextResponse.redirect(
        new URL("/api/auth/log-in", request.nextUrl.origin)
      );
    }
    await jwtVerify(
      accessToken.value,
      new TextEncoder().encode(getJWT_Secret_Key())
    );
    return NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    // if this block - access token invalid
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
      });
      if (!res.ok) {
        return NextResponse.redirect(
          new URL("/api/auth/log-in", request.nextUrl.origin)
        );
      }
      return NextResponse.next();
    } catch (e) {
      return NextResponse.json({ message: e as string }, { status: 500 });
    }
  }
}

export const config = {
  matcher: [
    "/api/current-weather/uv-index",
    "/api/current-weather/pollution",
    "/api/current-weather/week-forecast",
  ],
};
