import Additional from "./metrics/Metrics";
import CurrentWeather from "./CurrentWeather";
import styles from "../../styles/WeatherInfo.module.scss";
export default function WeatherMain() {
  return (
    <section className={styles.containerMain} aria-label="Weather information section">
      <CurrentWeather />
      <Additional />
    </section>
  );
}
