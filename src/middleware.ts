import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session");
    console.log(token);
    if (token) {
      const { payload } = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      );
      console.log("Token valid:", payload);
      return NextResponse.next();
    } else {
      throw new Error();
    }
  } catch (e) {
    console.log("No token found, redirecting...", e);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: [
    "/api/current-weather/uv-index",
    "/api/current-weather/pollution",
    "/api/current-weather/week-forecast",
  ],
};
