"use client";
import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "../../../styles/WeatherInfo.module.scss";
import { useContext } from "react";
import { DataContext } from "@/providers/data-provider";
import { lightThemeIcon, pollutionIcon } from "@/utils/Icons";
import { descriptionBuilder } from "@/utils/descriptionbuilder";
export default function PollutionUV() {
  const data = useContext(DataContext);
  if (typeof data === "object") {
    return (
      <div className={styles.metric__con}>
        {/* pollution cart */}
        <MetricCart title="Air Pollution" icon={pollutionIcon} size="large"  />

        {/* uvIndex cart */}
        <MetricCart icon={lightThemeIcon} title="UV index" size="large" />
      </div>
    );
  }
}
