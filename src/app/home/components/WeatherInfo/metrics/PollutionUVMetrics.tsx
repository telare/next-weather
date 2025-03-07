"use client";
import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "../../../styles/WeatherInfo.module.scss";
import { useContext } from "react";
import { DataContext } from "@/providers/data-provider";
import { lightThemeIcon, pollutionIcon } from "@/utils/Icons";
import { descriptionBuilder } from "@/utils/descriptionbuilder";
import UvPollutionProgressBar from "@/shared/components/ProgressBar/UvPollutionProgressBar";
import Skeleton from "@/shared/components/Skeletons/Skeleton";
export default function PollutionUV() {
  const weather = useContext(DataContext);
  if (weather.isError) {
    throw new Error("401 - unathorized. Log in or sign up please");
  }
  if (weather.isLoading)return <Skeleton className={styles.metric__con}/>;

  if (!weather.isError && weather.data) {
    return (
      <div className={styles.metric__con}>
        {/* pollution cart */}
        <MetricCart
          title="Air Pollution"
          icon={pollutionIcon}
          size="large"
          description={descriptionBuilder({
            title: "pollution",
            value: weather.data.other.pollution,
          })}
          renderComponent={UvPollutionProgressBar({
            value:
              weather.data.other.pollution <= 5
                ? Math.floor(weather.data.other.pollution * 20)
                : 100,
          })}
        />

        {/* uvIndex cart */}
        <MetricCart
          icon={lightThemeIcon}
          title="UV index"
          size="large"
          description={descriptionBuilder({
            title: "uvIndex",
            value: weather.data.other.uv,
          })}
          renderComponent={UvPollutionProgressBar({
            value:
              weather.data.other.uv <= 10
                ? Math.floor(weather.data.other.uv * 10)
                : 100,
          })}
        />
      </div>
    );
  }
}
