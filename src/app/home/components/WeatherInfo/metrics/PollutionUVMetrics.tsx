"use client";
import MetricCart from "@shared/components/Carts/MetricCart";
import styles from "../../../styles/WeatherInfo.module.scss";
import { useContext } from "react";
import { DataContext } from "@/providers/dataProvider/dataProvider";
import { lightThemeIcon, pollutionIcon } from "@/utils/Icons";
import descriptionBuilder  from "@/utils/descriptionBuilder";
import ProgressBar from "@/shared/components/ProgressBar/ProgressBar";
import Skeleton from "@shared/components/Skeletons/Skeleton";
export default function PollutionUV() {
  const weather = useContext(DataContext);
  if (weather.isError.status) {
    throw new Error(weather.isError.message);
  }
  if (weather.isLoading)return <Skeleton className={styles.metricItems}/>;

  if (!weather.isError.status&& weather.data) {
    return (
      <div className={styles.metricItems}>
        {/* pollution cart */}
        <MetricCart
          title="Air Pollution"
          icon={pollutionIcon}
          description={descriptionBuilder({
            title: "pollution",
            value: weather.data.other.pollution,
          })}
          mainInfo={ProgressBar({
            title: "Air pollution",
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
          description={descriptionBuilder({
            title: "uvIndex",
            value: weather.data.other.uv,
          })}
          mainInfo={ProgressBar({
            title: "UV Index",
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
