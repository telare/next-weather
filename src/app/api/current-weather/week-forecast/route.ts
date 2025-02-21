import { Weather } from "@/shared/types/Weather";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");

  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
    );
    const data = res.data;
    if (data) {
      const formatted_data: {
        [key: string]: Weather;
      } = {
        day1: data.day1,
        day2: data.day2,
        day3: data.day3,
        day4: data.day4,
        day5: data.day5,
      };
      return NextResponse.json(formatted_data);
    } else
      return NextResponse.json(`Error in data from external API`, {
        status: 500,
      });
  } catch (e) {
    return NextResponse.json(`Error in fetching 5 days forecast: ${e}`, {
      status: 500,
    });
  }
}
