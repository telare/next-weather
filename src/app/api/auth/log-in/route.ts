import { NextResponse } from "next/server";
import prisma from "@/app/clients/prismaClient";
import bcrypt from "bcryptjs";
import {
  serverError,
  jwtCookiesSetter,
  jwtTokensGenerator,
  reqMethodError,
  isUser,
  SecuredUser,
} from "@/utils/apiUtils";

export async function POST(req: Request) {
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
      return NextResponse.json({ message: "Sign up, please" }, { status: 401 });
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
      id: userData.id,
      name: userData.name,
      email: userData.email,
    };
    const { accessToken, refreshToken } = jwtTokensGenerator(securedUser);

    await jwtCookiesSetter(accessToken, refreshToken);
    return NextResponse.json(
      { message: "Successfully logged in" },
      { status: 200 }
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
