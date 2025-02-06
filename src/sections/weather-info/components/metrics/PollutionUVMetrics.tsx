import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "../../styles/WeatherInfo.module.scss";
export default function PollutionUV() {
  //api request for pollution etc
  return (
    //pollution & uv carts
    <div className={styles.metric__con}>
      {/* pollution cart */}
      <MetricCart />

      {/* uvIndex cart */}
      <MetricCart />
    </div>
  );
}
