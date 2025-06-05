"use client";
import dynamic from "next/dynamic";
const WeatherMap = dynamic(() => import("./WeatherMap"), {
  ssr: false,
  loading: () => <Skeleton className={styles.mapSection} />,
});
import styles from "./styles/WeatherInsights.module.scss";
import TopRatedCities from "./TopRatedCities";
import WeekForecast from "./WeekForecast";
import Skeleton from "@/shared/components/Skeletons/Skeleton";
export default function WeatherInsights() {
  return (
    <section className={styles.weatherInsightsCon}>
      <div className={styles.mainColumn}>
        <WeekForecast />
        <WeatherMap />
      </div>
      <aside className={styles.asideColumn}>
        <TopRatedCities />
      </aside>
    </section>
  );
}
