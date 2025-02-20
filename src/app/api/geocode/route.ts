import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const city = params.get("city") || "Kiev";
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
    );

    const coordinates: {
      lon: string;
      lat: string;
      name: string;
    } = {
      lon: res.data.coord.lon,
      lat: res.data.coord.lat,
      name: res.data.name,
    };
    return NextResponse.json(coordinates);
  } catch (e) {
    return NextResponse.json(`Error in fetching coordinates: ${e}`);
  }
}
