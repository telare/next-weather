
export async function GET() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?
     q=London
     &appid=cab314f839a1bb1856853409386f3e30`
  );
  const data = await res.json();

  return Response.json({
    weather: {
      icon: data.weather.main,
      descr: data.weather.description,
    },
    temperature: {
      current_temp: data.main.temp,
      max_temp: data.main.temp_max,
      min_temp: data.main.temp_min,
    },

    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
    },
  });
}
