"use client";
import { Layout } from "@/shared/types/Layout";
import { Weather } from "@/shared/types/Weather";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./global-store";

export const DataContext = createContext<Weather | undefined>(undefined);

export default function DataProvider({ children }: Layout) {
  const cityName = useSelector((state: RootState) => state.cityName.value);
  async function queryFunc(): Promise<Weather> {
    const response = await fetch(`/api/current-weather?q=${cityName}`);
    return await response.json();
  }
  const { data, isLoading, error } = useQuery({
    queryKey: [cityName],
    queryFn: () => queryFunc(),
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  if(data){
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>
  }
  if(isLoading){
    return <DataContext.Provider value={"Loading"}>{children}</DataContext.Provider>
  }
  if(error){
    return <DataContext.Provider value={`Error ${error.message}`}>{children}</DataContext.Provider>
  }
  
}
