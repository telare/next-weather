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
    console.log(data);
    return (
      <div className={styles.metric__con}>
        {/* pollution cart */}
        <MetricCart
          title="Air Pollution"
          icon={pollutionIcon}
          size="large"
          mainInfo={`${data.other.pollution}`}
          description={descriptionBuilder({
            title: "pollution",
            value: data.other.pollution,
          })}
        />

        {/* uvIndex cart */}
        <MetricCart
          icon={lightThemeIcon}
          title="UV index"
          size="large"
          mainInfo={`${data.other.uv}`}
          description={descriptionBuilder({
            title: "uvIndex",
            value: data.other.uv,
          })}
        />
      </div>
    );
  }
}
