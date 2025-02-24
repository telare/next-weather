"use client";
import styles from "../../styles/WeatherInfo.module.scss";
import MetricCart from "@/shared/components/Carts/MetricCart";
import { DataContext } from "@/providers/data-provider";
import { useContext } from "react";
import { weatherIconPicker } from "@/utils/weatherIconPicker";
import Clock from "@/app/home/components/WeatherInfo/Clock";
export default function CurrentWeather() {
  const weather = useContext(DataContext);
  if (weather.isError) {
    console.log(weather);
  }
  if (!weather.isError && weather.data) {
    return (
      <div className={styles.current_weather__con}>
        <Clock />
        <div className={styles.current_weather__con_current_temp}>
          <div>
            <h3>
              {weather.data.currentWeather.name &&
                weather.data.currentWeather.name}
            </h3>
          </div>
          <div>
            <h1>{`${Math.floor(
              weather.data.currentWeather.temperature.current_temp
            )}°`}</h1>
          </div>
        </div>
        <div className={styles.current_weather__con_footer}>
          <MetricCart
            icon={weatherIconPicker(weather.data.currentWeather.weather.icon)}
            title={weather.data.currentWeather.weather.descr}
            size="standart"
            description={`Low: ${weather.data.currentWeather.temperature.min_temp} High: ${weather.data.currentWeather.temperature.max_temp}`}
          />
          <MetricCart
            title="Wind"
            size="standart"
            mainInfo={`${weather.data.currentWeather.wind.speed}`}
          />
        </div>
      </div>
    );
  }
}
