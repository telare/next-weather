"use client";
import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "./styles/Footer.module.scss";
import { useContext } from "react";
import { DataContext } from "@/providers/data-provider";
import { weatherIconPicker } from "@/utils/weatherIconPicker";
import { descriptionBuilder } from "@/utils/descriptionbuilder";
import Skeleton from "@/shared/components/Skeletons/Skeleton";
export default function WeekForecast() {
  const weather = useContext(DataContext);
  if (weather.isError) {
    throw new Error("401 - unathorized. Log in or sign up please");
  }
  if (weather.isLoading) return <Skeleton className={styles.left__col_forecast} />;
  if (!weather.isError && weather.data) {
    return (
      <div className={styles.left__col_forecast}>
        {weather.data &&
          weather.data.other.weekForecast &&
          weather.data.other.weekForecast.map((day, i) => (
            <MetricCart
              key={i}
              icon={weatherIconPicker(day.weather.icon)}
              size="standart"
              description={descriptionBuilder({
                title: "feelslike",
                value: day.temperature.feels_like - 273,
              })}
              title={`${day.dt_txt && day.dt_txt.split(" ")[0]}`}
              mainInfo={`${Math.floor(day.temperature.current_temp - 273)}°`}
            />
          ))}
      </div>
    );
  }
}
