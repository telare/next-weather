import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "@/providers/prismaClient";
import { User } from "@/shared/types/User";
export async function GET(req: Request) {
  if (req.body) {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("session");
      if (token) {
        const userData = jwt.verify(
          token.value,
          process.env.JWT_SECRET_KEY as string
        );
        console.log(userData);
        const decodedUserData = jwt.decode(token.value);
        const userId = (decodedUserData as User).id;
        const userDataDB = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (userDataDB) {
          return NextResponse.json({ userData: true });
        }
        return NextResponse.json({ userData: false });
      } else {
        return NextResponse.json({ userData: false });
      }
    } catch (e) {
      return NextResponse.json({ message: `Error in fetching data, ${e}` });
    }
  } else {
    return NextResponse.json({ message: `Error in data from log-in page` });
  }
}
