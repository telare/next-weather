"use client";
import styles from "../../styles/WeatherInfo.module.scss";
import MetricCart from "@shared/components/Carts/MetricCart";
import { DataContext } from "@/providers/dataProvider/dataProvider";
import { useContext } from "react";
import { weatherIconPicker } from "@/utils/weatherIconPicker";
import Clock from "@/app/home/components/WeatherInfo/Clock";
import Image from "next/image";
import { windDirectionIcon, windIcon } from "@/utils/Icons";
import { descriptionBuilder } from "@/utils/descriptionBuilder";
import Skeleton from "@shared/components/Skeletons/Skeleton";

export default function CurrentWeather() {
  const weather = useContext(DataContext);
  if (weather.isError.status) {
    throw new Error(weather.isError.message);
  }
  if (weather.isLoading)
    return <Skeleton className={styles.weatherCurrentCon} />;
  if (!weather.isError.status && weather.data) {
    const windRenderComponent = (
      <div className={styles.compassCon}>
        <Image
          alt="Wind direction compass"
          src={"/img/compass_body.svg"}
          width={300}
          height={300}
          className={styles.compassBody}
        />
        <div
          className={styles.compassArrow}
          style={{
            transform: `rotate(${weather.data.currentWeather.wind.deg}deg)`,
          }}
        >
          {windDirectionIcon}
        </div>
      </div>
    );
    return (
      <div className={styles.weatherCurrentCon}>
        <div className={styles.weatherHeader}>
          <Clock />
        </div>
        <div className={styles.temperatureCon}>
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
        <div className={styles.weatherFooter}>
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
  return <div className={styles.weatherCurrentCon}></div>;
}
