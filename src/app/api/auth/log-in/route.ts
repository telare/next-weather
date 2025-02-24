import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/app/clients/prismaClient";
import { jwtVerify } from "jose";
import { User } from "@/shared/types/User";
export async function POST(req: Request) {
  if (req.body && req.method === "POST") {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("session");
      if (token) {
        const { payload } = await jwtVerify(
          token.value,
          new TextEncoder().encode(process.env.JWT_SECRET_KEY)
        );
        const userId = (payload as User).id;
        const userDataDB = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (userDataDB) {
          return NextResponse.json({ isUserVerifed: true });
        }
        return NextResponse.json({ isUserVerifed: false });
      } else {
        return NextResponse.json({ isUserVerifed: false });
      }
    } catch (e: unknown) {
      return NextResponse.json({
        message: `Error: ${e}`,
      });
    }
  } else {
    return NextResponse.json({ message: "Invalid request method" });
  }
}
