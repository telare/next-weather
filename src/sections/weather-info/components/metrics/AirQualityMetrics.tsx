import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "../../styles/WeatherInfo.module.scss";
export default function AirQualityMetrics() {
  return (
    // humidity pollution carts ...
    <div className={styles.metric__con}>

      {/* humidity cart*/}
      <MetricCart />
      
      {/* pressure cart */}
      <MetricCart />

      {/* visibility cart */}
      <MetricCart />

      {/* feels like cart */}
      <MetricCart />
    </div>
  );
}
