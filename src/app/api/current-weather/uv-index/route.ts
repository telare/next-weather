import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest) {
  try {
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/uvi?lon=${lon}&lat=${lat}&appid=${process.env.WEATHER_API_KEY}`
    );
    const data = await res.json();
    const uviData: {
      value: number;
    } = data.value;
    return NextResponse.json(uviData);
  } catch (e) {
    return NextResponse.json({ error: `Error in fetching uv index: ${e}` });
  }
}
