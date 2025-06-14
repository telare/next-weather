import bcrypt from "bcryptjs";
import { User } from "@shared/types/User";
import { NextResponse } from "next/server";
import prisma from "@/app/clients/prismaClient";
import {
  serverError,
  isUser,
  jwtCookiesSetter,
  jwtTokensGenerator,
  reqMethodError,
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

    const userHashedPass: string = await bcrypt.hash(userData.password, 10);
    const isUserExists: User | null = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (isUserExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
    await prisma.user.create({
      data: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userHashedPass,
      },
    });
    const securedUser: SecuredUser = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    };
    const { accessToken, refreshToken } = jwtTokensGenerator(securedUser);

    await jwtCookiesSetter(accessToken, refreshToken);

    return NextResponse.json(
      { message: "Successfully created account" },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    // add  types of errors handling
    return NextResponse.json(
      { message: `${serverError.message} ${e}` },
      { status: serverError.code }
    );
  } finally {
    await prisma.$disconnect();
  }
}
