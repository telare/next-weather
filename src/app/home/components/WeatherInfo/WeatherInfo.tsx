import Additional from "./metrics/Metrics";
import CurrentWeather from "./CurrentWeather";
import styles from "../../styles/WeatherInfo.module.scss";
export default function WeatherMain() {
  return (
    <section className={styles.containerMain}>
      <CurrentWeather />
      <Additional />
    </section>
  );
}
