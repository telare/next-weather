import {
  getJWTSecretKey,
  isSecuredUser,
  jwtCookiesSetter,
  jwtTokensGenerator,
  reqMethodError,
  serverError,
} from "@/utils/apiUtils";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
): Promise<NextResponse<{ message: string }>> {
  if (request.method !== "POST") {
    return NextResponse.json(
      {
        message: reqMethodError.message,
      },
      { status: reqMethodError.code }
    );
  }
  try {
    const refreshToken = request.cookies.get("refreshToken");
    if (!refreshToken) {
      throw new Error("No refreshToken under the 'refreshToken'");
    }
    const jwtSecretkey = getJWTSecretKey();
    const { payload: user } = await jwtVerify(
      refreshToken.value,
      new TextEncoder().encode(jwtSecretkey)
    );
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials. Please login again.",
        },
        { status: 401 }
      );
    }

    if (!isSecuredUser(user)) {
      return NextResponse.json(
        { message: "Invalid user data provided" },
        { status: 400 }
      );
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      jwtTokensGenerator(user);

    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    await jwtCookiesSetter(newAccessToken, newRefreshToken);
    return NextResponse.json(
      {
        message: "Credentials updated",
      },
      { status: 200 }
    );
  } catch (e: unknown) {
    return NextResponse.json(
      {
        message: `${serverError.message} ${e}`,
      },
      { status: 400 }
    );
  }
}
