import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { User } from "@/shared/types/User";
import { NextResponse } from "next/server";
import prisma from "@/providers/prismaClient";
export async function POST(req: Request) {
  const userData: User | undefined = await req.json();
  if (userData && req.method === "POST") {
    try {
      const user_hashed_pass = bcrypt.hashSync(userData.password, 10);
      const postUserDB = await prisma.user.create({
        data: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          password: user_hashed_pass,
        },
      });

      const Secret_Key: string | undefined = process.env.JWT_SECRET_KEY;
      const token = jwt.sign(
        { name: userData.name, id: userData.id, email: userData.email },
        Secret_Key as string,
        {
          algorithm: "HS256",
          expiresIn: "1h",
        }
      );

      const cookieStore = await cookies();
      cookieStore.set("session", token, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
        sameSite: "lax",
        path: "/",
      });
      return NextResponse.json(
        {
          message: "User registered",
          token: token,
        },
        { status: 201 }
      );
    } catch (e) {
      return NextResponse.json({ message: `Error: ${e}` }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return NextResponse.json({ message: "Bad request" }, { status: 500 });
  }
}
