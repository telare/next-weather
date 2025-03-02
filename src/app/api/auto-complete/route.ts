import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  try {
    const city = request.nextUrl.searchParams.get("city");
    if (city) {
      axios.get(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json",
        {
          params: {
            input: city,
            key: process.env.AUTO_COMPLETE_KEY as string,
          },
        }
      );
    }
    throw new Error("City name non-exists");
  } catch (e: unknown) {
    return NextResponse.json({ message: "Bad request" + e }, { status: 500 });
  }
}
