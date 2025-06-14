import axios from "axios";
import { clientErrorMessageBuilder } from "./errorMessageBuilder";
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
  const searchQuery: string = `lon=${coordinates.lon}&lat=${coordinates.lat}`;
  const weatherData = Promise.all([
    axios.get(`/api/current-weather?${searchQuery}`),
    axios.get(`/api/current-weather/pollution?${searchQuery}`),
    axios.get(`/api/current-weather/uv-index?${searchQuery}`),
    axios.get(`/api/current-weather/week-forecast?${searchQuery}`),
  ])
    .then(([currentWeatherResp, pollutionResp, uvResp, weekForecastResp]) => {
      return {
        currentWeather: currentWeatherResp.data,
        other: {
          pollution: pollutionResp.data,
          uv: uvResp.data,
          weekForecast: weekForecastResp.data,
        },
      };
    })
    .catch((e) => {
      if (axios.isAxiosError(e)) {
        setErrorMessage(clientErrorMessageBuilder(e.response?.status));
      }
      {
        setErrorMessage(e);
        return undefined;
      }
    });

  return weatherData;
}
