"use client";
import styles from "../../styles/WeatherInfo.module.scss";
import MetricCart from "@/shared/components/Carts/MetricCart";
import { DataContext } from "@/providers/data-provider";
import { useContext } from "react";
import { weatherIconPicker } from "@/utils/weatherIconPicker";
export default function CurrentWeather() {
  const data = useContext(DataContext);
  if (data) {
    console.log(data);
  }
  if (typeof data === "object") {
    return (
      <div className={styles.current_weather__con}>
        <div className={styles.current_weather__con_header}>
          <p>Saturday</p>
          <p>17:42:57</p>
        </div>
        <div className={styles.current_weather__con_current_temp}>
          <div>
            <h3>{data.name && data.name}</h3>
          </div>
          <div>
            <h1>{`${Math.floor(data?.temperature.current_temp)}°`}</h1>
          </div>
        </div>
        <div className={styles.current_weather__con_footer}>
          <MetricCart
            icon={weatherIconPicker(data.weather.icon)}
            title={data.weather.descr}
            size="standart"
            description={`Low: ${data.temperature.min_temp} High: ${data.temperature.max_temp}`}
          />
          <MetricCart
            title="Wind"
            size="standart"
            mainInfo={`${data.wind.speed}`}
          />
        </div>
      </div>
    );
  }
}
