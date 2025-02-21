"use client";
import styles from "../../styles/WeatherInfo.module.scss";
import MetricCart from "@/shared/components/Carts/MetricCart";
import { DataContext } from "@/providers/data-provider";
import { useContext } from "react";
import { weatherIconPicker } from "@/utils/weatherIconPicker";
import Clock from "@/app/home/components/WeatherInfo/Clock";
export default function CurrentWeather() {
  const data = useContext(DataContext);

  if (typeof data === "object") {
    return (
      <div className={styles.current_weather__con}>
        <Clock />
        <div className={styles.current_weather__con_current_temp}>
          <div>
            <h3>{data.currentWeather.name && data.currentWeather.name}</h3>
          </div>
          <div>
            <h1>{`${Math.floor(
              data.currentWeather.temperature.current_temp
            )}°`}</h1>
          </div>
        </div>
        <div className={styles.current_weather__con_footer}>
          <MetricCart
            icon={weatherIconPicker(data.currentWeather.weather.icon)}
            title={data.currentWeather.weather.descr}
            size="standart"
            description={`Low: ${data.currentWeather.temperature.min_temp} High: ${data.currentWeather.temperature.max_temp}`}
          />
          <MetricCart
            title="Wind"
            size="standart"
            mainInfo={`${data.currentWeather.wind.speed}`}
          />
        </div>
      </div>
    );
  }
}
