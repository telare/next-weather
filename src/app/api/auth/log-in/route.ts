import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "@/app/clients/prismaClient";
import { User } from "@/shared/types/User";
export async function POST(req: Request) {
  if (req.body && req.method === "POST") {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("session");
      if (token) {
        const userData = jwt.verify(
          token.value,
          process.env.JWT_SECRET_KEY as string
        );
        const decodedUserData = jwt.decode(token.value);
        const userId = (decodedUserData as User).id;
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
    } catch (e) {
      return NextResponse.json({ message: `Error in fetching data, ${e}` });
    }
  } else {
    return NextResponse.json({ message: `Error in data from log-in page` });
  }
}
