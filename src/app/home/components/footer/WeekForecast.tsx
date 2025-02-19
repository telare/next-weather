import MetricCart from "@/shared/components/Carts/MetricCart";
import styles from "./styles/Footer.module.scss";
export default function WeekForecast() {
  return (
    <div className={styles.left__col_forecast}>
      <MetricCart />
      <MetricCart />
      <MetricCart />
      <MetricCart />
    </div>
  );
}
