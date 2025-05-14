import Nav from "@shared/components/nav/Nav";
import styles from "./styles/Home.module.scss";
import WeatherMain from "./components/WeatherInfo/WeatherInfo";
import Footer from "./components/footer/Footer";
export default function HomePage() {
  return (
    <div className={styles.homeCon}>
      <Nav />
      <WeatherMain />
      <Footer />
    </div>
  );
}
