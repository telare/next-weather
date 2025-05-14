import axios from "axios";
import { errorMessageBuilder } from "./errorMessageBuilder";
import { WeatherData } from "./types";

interface QueryFuncProps {
  coordinates: {
    lon: string;
    lat: string;
  };
  setErrorMessage: (message: string) => void;
}

export async function queryFunc({
  coordinates,
  setErrorMessage,
}: QueryFuncProps): Promise<WeatherData | undefined> {
  try {
    const weatherData = Promise.all([
      axios.get(`/api/current-weather?lon=${coordinates.lon}&lat=${coordinates.lat}`),
      axios.get(`/api/current-weather/pollution?lon=${coordinates.lon}&lat=${coordinates.lat}`),
      axios.get(`/api/current-weather/uv-index?lon=${coordinates.lon}&lat=${coordinates.lat}`),
      axios.get(`/api/current-weather/week-forecast?lon=${coordinates.lon}&lat=${coordinates.lat}`),
    ])
      .then(
        async ([
          currentWeatherResp,
          pollutionResp,
          uvResp,
          weekForecastResp,
        ]) => {
          const currentWeatherData = currentWeatherResp.data;
          const pollutionData = pollutionResp.data;
          const uvData = uvResp.data;
          const weekForecastData = weekForecastResp.data;
          return {
            currentWeather: currentWeatherData,
            other: {
              pollution: pollutionData,
              uv: uvData,
              weekForecast: weekForecastData,
            },
          };
        }
      )
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          setErrorMessage(errorMessageBuilder(e.response?.status || 0));
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        throw new Error("Error in fetching data", e);
      });

    return weatherData;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      setErrorMessage(errorMessageBuilder(e.response?.status || 0));
    } else {
      setErrorMessage("An unexpected error occurred.");
    }
    throw new Error(`Error in fetching process:${e as string}`);
  }
}
