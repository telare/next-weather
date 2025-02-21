"use client";
import { Layout } from "@/shared/types/Layout";
import { Weather } from "@/shared/types/Weather";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./global-store";
import axios from "axios";

export const DataContext = createContext<
  | {
    currentWeather: Weather;
    other: {
      pollution: number;
      uv: number;
      weekForecast: {
        [key: string]: Weather;
      };
    };
  }
  | undefined
  | string
>(undefined);

export default function DataProvider({ children }: Layout) {
  const cityName = useSelector((state: RootState) => state.cityName.value);

  async function queryFunc(): Promise<
    | {
        currentWeather: Weather;
        other: {
          pollution: number;
          uv: number;
          weekForecast: {
            [key: string]: Weather;
          };
        };
      }
    | string
  > {
    try {
      // const currentWeatherResp = await axios.get(
      //   `/api/current-weather?lon=${cityName.lon}&lat=${cityName.lat}`
      // );
      // const currentWeatherData = currentWeatherResp.data;

      // const pollutionResp = await axios.get(
      //   `/api/current-weather/pollution?lon=${cityName.lon}&lat=${cityName.lat}`
      // );
      // const pollutionData = pollutionResp.data;

      // const uvResp = await axios.get(
      //   `/api/current-weather/pollution?lon=${cityName.lon}&lat=${cityName.lat}`
      // );
      // const uvData = uvResp.data;

      // const weeekForecastResp = await axios.get(
      //   `/api/current-weather?lon=${cityName.lon}&lat=${cityName.lat}`
      // );
      // const weeekForecastData = weeekForecastResp.data;
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
        return `Error in data`;
      }
    } catch (e) {
      return `${e}`;
    }
  }

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weathererror,
  } = useQuery({
    queryKey: [cityName],
    queryFn: () => queryFunc(),
  });

  if (weatherData) {
    return (
      <DataContext.Provider value={weatherData}>
        {children}
      </DataContext.Provider>
    );
  }
  if (isWeatherLoading) {
    return (
      <DataContext.Provider value={"Loading"}>{children}</DataContext.Provider>
    );
  }
  if (weathererror) {
    return (
      <DataContext.Provider value={`Error ${weathererror.message}`}>
        {children}
      </DataContext.Provider>
    );
  }
}
