import { Weather } from "@/shared/types/Weather";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");

  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lon=${lon}&lat=${lat}&appid=${process.env.WEATHER_API_KEY}`
    );
    const data = res.data;
    if (data) {
      const formatted_data: { day: Weather }[] = data.list
        .map((list, i) => {
          if (i === 0 || i === 8 || i === 16 || i === 24 || i === 32) {
            return {
              dt_txt: list.dt_txt,
              weather: {
                icon: list.weather[0].main,
                descr: list.weather[0].description,
              },
              temperature: {
                feels_like: list.main.feels_like,
                current_temp: list.main.temp,
                max_temp: list.main.temp_max,
                min_temp: list.main.temp_min,
              },
              other: {
                humidity: list.main.humidity,
                pressure: list.main.pressure,
                visibility: list.visibility,
              },
              wind: {
                speed: list.wind.speed,
                deg: list.wind.deg,
              },
            };
          } else {
            return null;
          }
        })
        .filter(Boolean);

      return NextResponse.json(formatted_data);
    } else
      return NextResponse.json("Error in data from external API", {
        status: 500,
      });
  } catch (e) {
    return NextResponse.json(`Error in fetching 5 days forecast: ${e}`, {
      status: 500,
    });
  }
}
