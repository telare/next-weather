import styles from "../../../styles/WeatherInfo.module.scss";
import PollutionUV from "./PollutionUVMetrics";
import WeatherIndicators from "./AirQualityMetrics";
export default function Additional() {
  return (
    <div className={styles.metrics__main_con}>
      <WeatherIndicators />
      <PollutionUV />
    </div>
  );
}
