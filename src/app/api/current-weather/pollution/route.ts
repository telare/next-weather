import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");
    if (!lat || !lon) {
      throw new Error("Incorrect search parameters passed. Expected: lat, lon");
    }
    if(typeof lat !== "string" || typeof lon !== "string"){
      throw new Error("Incorrect search parameters type passed. Expected: string");
    }
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lon=${lon}&lat=${lat}&units=metric&appid=f626d0f6a4d3109dbc86f71ab2acf257`
    );
    const data = await res.json();
    const pollutionData: {
      value: number;
    } = data.list[0].main.aqi;

    return NextResponse.json(pollutionData, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: `Error in fetching of pollution data: ${e}` },
      { status: 400 }
    );
  }
}
