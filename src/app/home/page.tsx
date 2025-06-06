import Nav from "@shared/components/nav/Nav";
import styles from "./styles/Home.module.scss";
import WeatherMain from "./components/WeatherInfo/WeatherInfo";
import WeatherInsights from "./components/footer/WeatherInsights";
export default function HomePage() {
  return (
    <main className={styles.homeCon} aria-label="Home page main content"> 
      <Nav />
      <WeatherMain />
      <WeatherInsights />
    </main>
  );
}
