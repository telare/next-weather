import { NextRequest, NextResponse } from "next/server";

export  async function GET(req: NextRequest) {
  try {
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lon=${lon}&lat=${lat}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    const data = await res.json();
    const pollutionData: {
      value: number;
    } = data.list[0].main.aqi;
    return NextResponse.json(pollutionData);
  } catch (e) {
    return NextResponse.json({ error: `Error in fetching pollution: ${e}` });
  }
}
