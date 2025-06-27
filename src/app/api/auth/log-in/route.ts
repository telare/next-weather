import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/clients/prismaClient";
import bcrypt from "bcryptjs";
import {
  jwtCookiesSetter,
  jwtTokensGenerator,
  isUser,
  SecuredUser,
  reqMethodError,
  serverError,
} from "@/utils/apiUtils";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        message: reqMethodError.message,
      },
      { status: reqMethodError.code }
    );
  }

  try {
    const userData = await req.json();
    if (!isUser(userData)) {
      return NextResponse.json(
        { message: "Invalid user data provided" },
        { status: 400 }
      );
    }
    const userDataDB = await prisma.user.findFirst({
      where: { email: userData.email },
    });
    if (!userDataDB) {
      return NextResponse.json(
         { message: "No account found with that email. Please sign up." },
        { status: 401 }
      );
    }

    const isPasswordEqual: boolean = await bcrypt.compare(
      userData.password,
      userDataDB.password
    );
    if (!isPasswordEqual) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
    const securedUser: SecuredUser = {
      id: userDataDB.id,
      name: userDataDB.name,
      email: userData.email,
    };
    const { accessToken, refreshToken } = jwtTokensGenerator(securedUser);

    await jwtCookiesSetter(accessToken, refreshToken);
    return NextResponse.json(
      { message: "Successfully logged in" },
      { status: 201 }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    return NextResponse.json(
      {
        message: serverError.message,
      },
      { status: serverError.code }
    );
  } finally {
    await prisma.$disconnect();
  }
}
