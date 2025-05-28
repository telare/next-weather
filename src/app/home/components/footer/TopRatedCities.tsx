import styles from "./styles/Footer.module.scss";
export default function TopRatedCities() {
  return (
    <div className={styles.cityList}>
      <h3>Top rated cities</h3>
      <div>
        <p>Tokyo</p>
      </div>
      <div>
        <p>Paris</p>
      </div>
      <div>
        <p>New York City</p>
      </div>
      <div>
        <p>Sydney</p>
      </div>
    </div>
  );
}
