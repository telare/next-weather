import { NextResponse } from "next/server";

export default async function GET() {
  try {
    const res = await fetch("");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: `Error in fetching pollution: ${e}` });
  }
}
