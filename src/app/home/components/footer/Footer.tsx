"use client";
import dynamic from "next/dynamic";
const WeatherMap = dynamic(() => import("./WeatherMap"), {
  ssr: false,
  loading: () => <Skeleton className={styles.mapSection} />,
});
import styles from "./styles/Footer.module.scss";
import TopRatedCities from "./TopRatedCities";
import WeekForecast from "./WeekForecast";
import Skeleton from "@/shared/components/Skeletons/Skeleton";
export default function Footer() {
  return (
    <div className={styles.footerCon}>
      <div className={styles.mainColumn}>
        <WeekForecast />
        <WeatherMap />
      </div>
      <aside className={styles.asideColumn}>
        <TopRatedCities />
      </aside>
    </div>
  );
}
