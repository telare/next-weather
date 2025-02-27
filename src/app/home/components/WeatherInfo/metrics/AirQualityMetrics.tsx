"use client";
import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "../../../styles/WeatherInfo.module.scss";
import { useContext } from "react";
import { DataContext } from "@/providers/data-provider";
import { humidityIcon, pressureIcon, thermometerIcon, visibilityIcon } from "@/utils/Icons";
import { descriptionBuilder } from "@/utils/descriptionbuilder";
export default function AirQualityMetrics() {
  const weather = useContext(DataContext);
  if (weather.isError) {
    throw new Error("401 - unathorized. Log in or sign up please");
  }
  if (!weather.isError && weather.data) {
    return (
      <div className={styles.metric__con}>
        {/* humidity cart*/}
        <MetricCart
          title="Humidity"
          icon={humidityIcon}
          size="standart"
          mainInfo={`${weather.data.currentWeather.other.humidity} %`}
          description={descriptionBuilder({title:"humidity", value:weather.data.currentWeather.other.humidity})}
        />

        {/* pressure cart */}
        <MetricCart
          title="Pressure"
          icon={pressureIcon}
          size="standart"
          mainInfo={`${weather.data.currentWeather.other.pressure} Pa`}
          description={descriptionBuilder({title:"pressure", value: weather.data.currentWeather.other.pressure})}
        />

        {/* visibility cart */}
        <MetricCart
          title="Visibility"
          icon={visibilityIcon}
          size="standart"
          mainInfo={`${weather.data.currentWeather.other.visibility/ 100} %`}
          description={descriptionBuilder({title:"visibility", value: weather.data.currentWeather.other.visibility})}
        />

        {/* feels like cart */}
        <MetricCart
          title="Feels like"
          icon={thermometerIcon}
          size="standart"
          mainInfo={`${Math.floor(weather.data.currentWeather.temperature.feels_like)}°`}
          description={descriptionBuilder({title:"feelslike", value: weather.data.currentWeather.temperature.feels_like})}
        />
      </div>
    );
  }
}
