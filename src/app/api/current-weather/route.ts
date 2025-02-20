import { Weather } from "@/shared/types/Weather";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");
  console.log(lon, lat)
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&units=metric&appid=${process.env.WEATHER_API_KEY}`
  );
  const data = await res.json();
  const formatted_data: Weather = {
    name: data.name,
    weather: {
      icon: data.weather[0].main,
      descr: data.weather[0].description,
    },
    temperature: {
      feels_like: data.main.feels_like,
      current_temp: data.main.temp,
      max_temp: data.main.temp_max,
      min_temp: data.main.temp_min,
    },
    other: {
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      visibility: data.visibility,
    },
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
    },
  };

  return Response.json(formatted_data);
}
