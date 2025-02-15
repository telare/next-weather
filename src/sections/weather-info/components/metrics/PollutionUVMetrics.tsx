"use client"
import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "../../styles/WeatherInfo.module.scss";
import { useContext } from "react";
import { DataContext } from "@/providers/data-provider";
export default function PollutionUV() {
  const data = useContext(DataContext)
  
  //api request for pollution etc
  return (
    //pollution & uv carts
    <div className={styles.metric__con}>
      {/* pollution cart */}
      <MetricCart title="Air Pollution" icon="/icons/night-mode/humidity.png" size="large" />

      {/* uvIndex cart */}
      <MetricCart title="UV index" icon="/icons/night-mode/humidity.png" size="large"/>
    </div>
  );
}
