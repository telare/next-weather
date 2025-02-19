"use client";
import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "../../../styles/WeatherInfo.module.scss";
import { useContext, useEffect } from "react";
import { DataContext } from "@/providers/data-provider";
export default function AirQualityMetrics() {
  const data = useContext(DataContext);
  useEffect(()=>{
    if(data){
      console.log('Data:',data)
    }
  },[data])
  if (typeof data === "object") {
    return (
      <div className={styles.metric__con}>
        {/* humidity cart*/}
        <MetricCart
          title="Humidity"
          icon="/icons/night-mode/humidity.png"
          size="standart"
          mainInfo={`${data.other.humidity} %`}
          description="Humidity info"
        />

        {/* pressure cart */}
        <MetricCart
          title="Pressure"
          icon="/icons/night-mode/pressure.png"
          size="standart"
          mainInfo={`${data.other.pressure} Pa`}
          description="Pressure info"
        />

        {/* visibility cart */}
        <MetricCart
          title="Visibility"
          icon="/icons/night-mode/visibility.png"
          size="standart"
          mainInfo={`${data.other.visibility / 100} %`}
          description="Visibility info"
        />

        {/* feels like cart */}
        <MetricCart
          title="Feels like"
          icon="/icons/night-mode/thermometr.png"
          size="standart"
          mainInfo={`${Math.floor(data.temperature.feels_like)}°`}
          description="Feels Like info"
        />
      </div>
    );
  }
}
