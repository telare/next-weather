import { Weather } from "@/shared/types/Weather";

export async function GET(req: Request) {
  const url: URL = new URL(req.url);
  const city: string = url.searchParams.get("q") || "Kiev";
  console.log("City in route handler: ",city)
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`
  );
  const data = await res.json();
  const formatted_data: Weather = {
    name:data.name,
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
      // uv: data.current.uvi,
    },
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
    },
  };

  return Response.json(formatted_data);
}
