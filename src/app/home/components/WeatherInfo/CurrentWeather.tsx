"use client";
import styles from "../../styles/WeatherInfo.module.scss";
import MetricCart from "@shared/components/Carts/MetricCart";
import { DataContext } from "@/providers/dataProvider/dataProvider";
import { useContext } from "react";
import { weatherIconPicker } from "@/utils/weatherIconPicker";
import Clock from "@/app/home/components/WeatherInfo/Clock";
import Image from "next/image";
import { windDirectionIcon, windIcon } from "@/utils/Icons";
import descriptionBuilder from "@/utils/descriptionBuilder";
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
          alt={`Wind direction compass pointing ${weather.data.currentWeather.wind.deg} degrees`}
          src="/img/compass_body.svg"
          fill
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
      <div
        className={styles.weatherCurrentCon}
        aria-label={`Current weather in ${weather.data.currentWeather.name}`}
        role="region"
      >
        <header>
          <Clock />
        </header>
        <section
          className={styles.temperatureCon}
          aria-label={`Weather details for ${weather.data.currentWeather.name}`}
        >
          <div aria-label={`Location: ${weather.data.currentWeather.name}`}>
            <h3>
              {weather.data.currentWeather.name &&
                weather.data.currentWeather.name}
            </h3>
          </div>
          <div
            aria-label={`Current temperature is ${Math.floor(
              weather.data.currentWeather.temperature.current_temp
            )} degrees`}
          >
            <h1>{`${Math.floor(
              weather.data.currentWeather.temperature.current_temp
            )}°`}</h1>
          </div>
        </section>
        <footer
          aria-label={`Weather details for ${weather.data.currentWeather.name}`}
        >
          <MetricCart
            ariaLabel="Current weather conditions"
            title={weather.data.currentWeather.weather.descr}
            mainInfo={weatherIconPicker(
              weather.data.currentWeather.weather.icon
            )}
            description={`Low: ${Math.floor(
              weather.data.currentWeather.temperature.min_temp
            )} \nHigh: ${Math.floor(
              weather.data.currentWeather.temperature.max_temp
            )}`}
          />
          <MetricCart
            ariaLabel="Current wind conditions"
            icon={windIcon}
            title="Wind"
            mainInfo={windRenderComponent}
            description={descriptionBuilder({
              title: "wind",
              value: weather.data.currentWeather.wind.speed,
            })}
          />
        </footer>
      </div>
    );
  }
}
