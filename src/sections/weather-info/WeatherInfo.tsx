import Additional from "./components/Metrics";
import CurrentWeather from "./components/CurrentWeather ";
import styles from "./styles/WeatherInfo.module.scss";
export default function WeatherMain() {
  return (
    <div className={styles.main__con}>
      <CurrentWeather />
      <Additional />
    </div>
  );
}
