import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, errors } from "jose";
import { getJWTSecretKey, serverError } from "./utils/apiUtils";

export async function middleware(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    if (!accessToken) {
      return NextResponse.json(
        {
          message:
            "Unauthorized due to invalid credentials. Please log-in or sign-up.",
        },
        { status: 401 }
      );
    }
    await jwtVerify(
      accessToken.value,
      new TextEncoder().encode(getJWTSecretKey())
    );
    return NextResponse.next();
  } catch (e: unknown) {
    // if this block - access token invalid
    if (
      e instanceof errors.JWTExpired ||
      e instanceof errors.JWTClaimValidationFailed
    ) {
      try {
        const res = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
          method: "POST",
          headers: {
            Cookie: request.headers.get("Cookie") || "",
          },
        });
        if (!res.ok) {
          return NextResponse.json(
            {
              message: "Unauthorized",
            },
            { status: 401 }
          );
        }
        const newSetCookieHeader = res.headers.get("Set-Cookie");
        const response = NextResponse.next();
        if (newSetCookieHeader) {
          response.headers.set("Set-Cookie", newSetCookieHeader);
        }
        return response;
      } catch (e: unknown) {
        return NextResponse.json(
          {
            message: `Error in middleware, in fetch to /refresh: ${e as string}`,
          },
          { status: 500 }
        );
      }
    } else {
      if (e instanceof errors.JOSEError) {
        return NextResponse.json(
          {
            message: `Error caused by jose: ${e}`,
          },
          { status: 401 }
        );
      } else {
        return NextResponse.json(
          {
            message: `${serverError.message} ${e}`,
          },
          { status: serverError.code }
        );
      }
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
