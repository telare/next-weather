import { NextResponse } from "next/server";
import prisma from "@/app/clients/prismaClient";
import { User } from "@/shared/types/User";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  if (req.body && req.method === "POST") {
    try {
      const userData: User | undefined = await req.json();
      if (!userData) throw new Error("invalid data in request");
      if (userData) {
        const userDataDB = await prisma.user.findFirst({
          where: { email: userData.email },
        });
        if(userDataDB){
          const isPasswordEqual: boolean = await bcrypt.compare(userData.password, userDataDB.password);
          if(isPasswordEqual) return NextResponse.json({ isUserVerifed: true });
        }
        return NextResponse.json({ isUserVerifed: false });
      }
    } catch (e: unknown) {
      return NextResponse.json({
        message: `Error: ${e}`,
      });
    } finally {
      prisma.$disconnect();
    }
  } else {
    return NextResponse.json({
      message: "Invalid method or no body in request",
    });
  }
}
