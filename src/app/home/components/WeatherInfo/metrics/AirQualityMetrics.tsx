"use client";
import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "../../../styles/WeatherInfo.module.scss";
import { useContext } from "react";
import { DataContext } from "@/providers/data-provider";
import { humidityIcon, pressureIcon, thermometerIcon, visibilityIcon } from "@/utils/Icons";
import { descriptionBuilder } from "@/utils/descriptionbuilder";
export default function AirQualityMetrics() {
  const data = useContext(DataContext);
  if (typeof data === "object") {
    return (
      <div className={styles.metric__con}>
        {/* humidity cart*/}
        <MetricCart
          title="Humidity"
          icon={humidityIcon}
          size="standart"
          mainInfo={`${data.currentWeather.other.humidity} %`}
          description={descriptionBuilder({title:"humidity", value:data.currentWeather.other.humidity})}
        />

        {/* pressure cart */}
        <MetricCart
          title="Pressure"
          icon={pressureIcon}
          size="standart"
          mainInfo={`${data.currentWeather.other.pressure} Pa`}
          description={descriptionBuilder({title:"pressure", value: data.currentWeather.other.pressure})}
        />

        {/* visibility cart */}
        <MetricCart
          title="Visibility"
          icon={visibilityIcon}
          size="standart"
          mainInfo={`${data.currentWeather.other.visibility/ 100} %`}
          description={descriptionBuilder({title:"visibility", value: data.currentWeather.other.visibility})}
        />

        {/* feels like cart */}
        <MetricCart
          title="Feels like"
          icon={thermometerIcon}
          size="standart"
          mainInfo={`${Math.floor(data.currentWeather.temperature.feels_like)}°`}
          description={descriptionBuilder({title:"feelslike", value: data.currentWeather.temperature.feels_like})}
        />
      </div>
    );
  }
}
