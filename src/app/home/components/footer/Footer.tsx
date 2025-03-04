"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map"), {
  ssr: false, 
});
import TopRatedCities from "./TopRatedCities";
import WeekForecast from "./WeekForecast";
import styles from "./styles/Footer.module.scss";
export default function Footer() {
  return (
    <div className={styles.main__con}>
      <div className={styles.left__col}>
        <WeekForecast />
        <Map />
      </div>
      <div className={styles.right__col}>
        <TopRatedCities />
      </div>
    </div>
  );
}
