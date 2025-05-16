"use client";
import { Layout } from "@shared/types/Layout";
import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../globalStore";
import { GlobalContext } from "./utils/types";
import { queryFunc } from "./utils/queryFnc";

export const DataContext = createContext<GlobalContext>({
  isLoading: false,
  isError: { status: false, message: "" },
  data: undefined,
});

export default function DataProvider({ children }: Layout) {
  const location = useSelector((state: RootState) => state.location.value);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError,
  } = useQuery({
    queryKey: ["weather", location.lat, location.lon],
    queryFn: () => 
      queryFunc({
        coordinates: { lon: location.lon, lat: location.lat },
        setErrorMessage,
      }),
    retry: 1,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return (
    <DataContext.Provider
      value={{
        data: weatherData,
        isError: { status: isError, message: errorMessage },
        isLoading: isWeatherLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
