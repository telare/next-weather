import { Weather } from "@/shared/types/Weather";

export async function GET(req: Request) {
  const url: URL = new URL(req.url);
  const city: string = url.searchParams.get("city") || "Kiev";
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric&appid=${process.env.WEATHER_API_KEY}`
  );
  const data = await res.json();
  const formatted_data: Weather = {
    // general: {
    //   name:data.main,
    //   sunrise: data.current.sunrise,
    //   sunset: data.current.sunset,
    // },
    weather: {
      icon: data.weather.main,
      descr: data.weather.description,
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
      // uv: data.current.uvi,
    },
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
    },
  };

  return Response.json(formatted_data);
}
