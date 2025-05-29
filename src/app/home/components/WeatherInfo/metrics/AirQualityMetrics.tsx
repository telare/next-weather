"use client";
import MetricCart from "@shared/components/Carts/MetricCart";
import styles from "../../../styles/WeatherInfo.module.scss";
import { useContext } from "react";
import { DataContext } from "@/providers/dataProvider/dataProvider";
import {
  humidityIcon,
  pressureIcon,
  thermometerIcon,
  visibilityIcon,
} from "@/utils/Icons";
import { descriptionBuilder } from "@/utils/descriptionBuilder";
import Skeleton from "@shared/components/Skeletons/Skeleton";
export default function AirQualityMetrics() {
  const weather = useContext(DataContext);
  if (weather.isError.status) {
    throw new Error(weather.isError.message);
  }
  if (weather.isLoading) return <Skeleton className={styles.metricItems} />;
  if (!weather.isError.status&& weather.data) {
    return (
      <div className={styles.metricItems}>
        {/* humidity cart*/}
        <MetricCart
          title="Humidity"
          icon={humidityIcon}
          mainInfo={`${weather.data.currentWeather.other.humidity} %`}
          description={descriptionBuilder({
            title: "humidity",
            value: weather.data.currentWeather.other.humidity,
          })}
        />

        {/* pressure cart */}
        <MetricCart
          title="Pressure"
          icon={pressureIcon}
          mainInfo={`${weather.data.currentWeather.other.pressure} Pa`}
          description={descriptionBuilder({
            title: "pressure",
            value: weather.data.currentWeather.other.pressure,
          })}
        />

        {/* visibility cart */}
        <MetricCart
          title="Visibility"
          icon={visibilityIcon}
          mainInfo={`${weather.data.currentWeather.other.visibility / 100} %`}
          description={descriptionBuilder({
            title: "visibility",
            value: weather.data.currentWeather.other.visibility,
          })}
        />

        {/* feels like cart */}
        <MetricCart
          title="Feels like"
          icon={thermometerIcon}
          mainInfo={`${Math.floor(weather.data.currentWeather.temperature.feels_like)}°`}
          description={descriptionBuilder({
            title: "feelslike",
            value: weather.data.currentWeather.temperature.feels_like,
          })}
        />
      </div>
    );
  }
}
