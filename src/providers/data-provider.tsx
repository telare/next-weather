"use client";
import { Layout } from "@/shared/types/Layout";
import { Weather } from "@/shared/types/Weather";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./global-store";
import axios from "axios";

export const DataContext = createContext<{
  isLoading: boolean;
  isError: boolean;
  data:
    | {
        currentWeather: Weather;
        other: {
          pollution: number;
          uv: number;
          weekForecast: Weather[];
        };
      }
    | undefined;
}>({
  isLoading: false,
  isError: false,
  data: undefined,
});

export default function DataProvider({ children }: Layout) {
  const cityName = useSelector((state: RootState) => state.cityName.value);

  async function queryFunc(): Promise<
    | {
        currentWeather: Weather;
        other: {
          pollution: number;
          uv: number;
          weekForecast: Weather[];
        };
      }
    | undefined
  > {
    try {
      if (cityName.lat !== "" && cityName.lon !== "") {
        const currentWeatherResp = await axios.get(
          `/api/current-weather?lon=${cityName.lon}&lat=${cityName.lat}`
        );
        const currentWeatherData = currentWeatherResp.data;

        const pollutionResp = await axios.get(
          `/api/current-weather/pollution?lon=${cityName.lon}&lat=${cityName.lat}`
        );
        const pollutionData = pollutionResp.data;

        const uvResp = await axios.get(
          `/api/current-weather/uv-index?lon=${cityName.lon}&lat=${cityName.lat}`
        );
        const uvData = uvResp.data;

        const weekForecastResp = await axios.get(
          `/api/current-weather/week-forecast?lon=${cityName.lon}&lat=${cityName.lat}`
        );
        const weekForecastData = weekForecastResp.data;
        const weatherData = {
          currentWeather: currentWeatherData,
          other: {
            pollution: pollutionData,
            uv: uvData,
            weekForecast: weekForecastData,
          },
        };
        return weatherData;
      } else {
        throw new Error("Latitude and Longitude are required");
      }
    } catch (e: unknown) {
      throw new Error(e as string);
    }
  }

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError,
  } = useQuery({
    queryKey: [cityName],
    queryFn: () => queryFunc(),
  });

  return (
    <DataContext.Provider
      value={{
        data: weatherData,
        isError: isError,
        isLoading: isWeatherLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
