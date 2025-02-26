import styles from "./styles/Footer.module.scss";
export default function TopRatedCities() {
  return (
    <div className={styles.right__col_top_cities}>
      <h3>Top rated cities</h3>
      <div>Tokyo</div>
      <div>Paris</div>
      <div>New York City</div>
      <div>Sydney</div>
    </div>
  );
}
