import styles from "./styles/Footer.module.scss";
export default function TopRatedCities() {
  return (
    <div className={styles.cityList}>
      <h3>Top rated cities</h3>
      <div>Tokyo</div>
      <div>Paris</div>
      <div>New York City</div>
      <div>Sydney</div>
    </div>
  );
}
