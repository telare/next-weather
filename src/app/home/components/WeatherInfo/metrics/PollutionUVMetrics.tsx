"use client";
import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "../../../styles/WeatherInfo.module.scss";
import { useContext } from "react";
import { DataContext } from "@/providers/data-provider";
import { lightThemeIcon, pollutionIcon } from "@/utils/Icons";
import { descriptionBuilder } from "@/utils/descriptionbuilder";
export default function PollutionUV() {
  const weather = useContext(DataContext);
  if (!weather.isError && weather.data) {
    return (
      <div className={styles.metric__con}>
        {/* pollution cart */}
        <MetricCart
          title="Air Pollution"
          icon={pollutionIcon}
          size="large"
          mainInfo={`${weather.data.other.pollution}`}
          description={descriptionBuilder({
            title: "pollution",
            value: weather.data.other.pollution,
          })}
        />

        {/* uvIndex cart */}
        <MetricCart
          icon={lightThemeIcon}
          title="UV index"
          size="large"
          mainInfo={`${weather.data.other.uv}`}
          description={descriptionBuilder({
            title: "uvIndex",
            value: weather.data.other.uv,
          })}
        />
      </div>
    );
  }
}
