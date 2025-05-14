import { Weather } from "@shared/types/Weather";

export interface WeatherData {
  currentWeather: Weather;
  other: {
    pollution: number;
    uv: number;
    weekForecast: Weather[];
  };
}

export interface GlobalContext {
  isLoading: boolean;
  isError: { status: boolean; message: string };
  data: WeatherData | undefined;
}
