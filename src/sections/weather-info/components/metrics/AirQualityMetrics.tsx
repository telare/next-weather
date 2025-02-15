"use client";
import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "../../styles/WeatherInfo.module.scss";
import { useContext } from "react";
import  { DataContext } from "@/providers/data-provider";
export default function AirQualityMetrics() {
  const data = useContext(DataContext)
  return (
    <div className={styles.metric__con}>
      
      {/* humidity cart*/}
      <MetricCart
        title="Humidity"
        icon="/icons/night-mode/humidity.png"
        size="standart"
        // mainInfo={`${data?.other.humidity} %`}
        description="Humidity info"
      />

      {/* pressure cart */}
      <MetricCart
        title="Pressure"
        icon="/icons/night-mode/pressure.png"
        size="standart"
        // mainInfo={`${data?.other.pressure} Pa`}
        description="Humidity info"
      />

      {/* visibility cart */}
      <MetricCart
        title="Visibility"
        icon="/icons/night-mode/visibility.png"
        size="standart"
        // mainInfo={`${data?.other.visibility && data?.other.visibility / 100} %`}
        description="Humidity info"
      />

      {/* feels like cart */}
      <MetricCart
        title="Feels like"
        icon="/icons/night-mode/thermometr.png"
        size="standart"
        // mainInfo={`${
        //   data?.temperature.feels_like
        //     ? Math.floor(data?.temperature.feels_like)
        //     : 10
        // }°`}
        description="Humidity info"
      />
    </div>
  );
}
