import { Location } from "@/providers/dataProvider/globalStore/reducers/location";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const city = params.get("city") || "Kiev";
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
    );

    const coordinates: Location = {
      lon: res.data.coord.lon,
      lat: res.data.coord.lat,
      cityName: res.data.name,
    };
    return NextResponse.json(coordinates, { status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in fetching coordinates: ${e}`, {
      status: 400,
    });
  }
}
