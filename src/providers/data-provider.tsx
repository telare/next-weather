"use client";
import { Layout } from "@/shared/types/Layout";
import { Weather } from "@/shared/types/Weather";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./global-store";

export const DataContext = createContext<
  Weather | "loading" | "error" | undefined
>(undefined);

export default function DataProvider({ children }: Layout) {
  const cityName = useSelector((state: RootState) => state.cityName.cityName);
  const [weatherData, setWeatherData] = useState<
    Weather | "loading" | "error"
  >();
  async function queryFunc(): Promise<Weather> {
    const response = await fetch(`/current-weather?q=${cityName}`);
    return await response.json();
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["current-weather"],
    queryFn: () => queryFunc(),
  });
  useEffect(() => {
    if (!isLoading && !isError) {
      setWeatherData(data);
    }
    if (isLoading) {
      setWeatherData("loading");
    }
    if (isError) {
      setWeatherData("error");
    }
  }, [cityName]);

  return (
    <DataContext.Provider value={weatherData}>{children}</DataContext.Provider>
  );
}
