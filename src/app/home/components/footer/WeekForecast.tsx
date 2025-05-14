"use client";
import MetricCart from "@shared/components/Carts/MetricCart";
import styles from "./styles/Footer.module.scss";
import { useContext } from "react";
import { DataContext } from "@/providers/dataProvider/dataProvider";
import { weatherIconPicker } from "@/utils/weatherIconPicker";
import Skeleton from "@shared/components/Skeletons/Skeleton";
import { descriptionBuilder } from "@/utils/descriptionBuilder";
export default function WeekForecast() {
  const weather = useContext(DataContext);
  if (weather.isError.status) {
    throw new Error(weather.isError.message);
  }
  if (weather.isLoading) return <Skeleton className={styles.forecastSection} />;
  if (!weather.isError.status&& weather.data) {
    return (
      <div className={styles.forecastSection}>
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
