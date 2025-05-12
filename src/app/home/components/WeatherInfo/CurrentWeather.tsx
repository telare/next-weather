"use client";
import styles from "../../styles/WeatherInfo.module.scss";
import MetricCart from "@/shared/components/Carts/MetricCart";
import { DataContext } from "@/providers/data-provider";
import { useContext } from "react";
import { weatherIconPicker } from "@/utils/weatherIconPicker";
import Clock from "@/app/home/components/WeatherInfo/Clock";
import Image from "next/image";
import { windIcon } from "@/utils/Icons";
import { descriptionBuilder } from "@/utils/descriptionbuilder";
import Skeleton from "@/shared/components/Skeletons/Skeleton";
export default function CurrentWeather() {
  const weather = useContext(DataContext);
  if (weather.isError) {
    throw new Error("401 - unathorized. Log in or sign up please");
  }
  if (weather.isLoading)return <Skeleton className={styles.current_weather__con} />;

  if (!weather.isError && weather.data) {
    const windRenderComponent = (
      <div className={styles.wind__compass_con}>
        <Image
          alt="Wind direction compass"
          src={"/img/compass_body.svg"}
          width={300}
          height={300}
          className={styles.wind__compass_body}
        />
        <Image
          alt={`Wind direction arrow pointing ${weather.data.currentWeather.wind.deg}°`}
          src={"/img/compass_arrow.svg"}
          width={300}
          height={300}
          className={styles.wind__compass_arrow}
          style={{
            transform: `rotate(${weather.data.currentWeather.wind.deg}deg)`,
          }}
        />
      </div>
    );
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
            title={weather.data.currentWeather.weather.descr}
            size="standart"
            renderComponent={weatherIconPicker(
              weather.data.currentWeather.weather.icon
            )}
            description={`Low: ${Math.floor(
              weather.data.currentWeather.temperature.min_temp
            )} \nHigh: ${Math.floor(
              weather.data.currentWeather.temperature.max_temp
            )}`}
          />
          <MetricCart
            icon={windIcon}
            title="Wind"
            size="standart"
            renderComponent={windRenderComponent}
            mainInfo={`${weather.data.currentWeather.wind.speed}`}
            description={descriptionBuilder({
              title: "wind",
              value: weather.data.currentWeather.wind.speed,
            })}
          />
        </div>
      </div>
    );
  }
  return <div className={styles.current_weather__con}></div>;
}
