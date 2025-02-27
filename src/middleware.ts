import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session");
    if (token) {
      await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      );
      return NextResponse.next();
    } else {
      throw new Error("No valid token in cookies");
    }
  } catch (e) {
    return NextResponse.json(
      { message: `Invalid token, ${e}` },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/current-weather/uv-index",
    "/api/current-weather/pollution",
    "/api/current-weather/week-forecast",
  ],
};
