import Nav from "@/sections/header/Nav";
import styles from "./Home.module.scss";
import WeatherMain from "@/sections/weather-info/WeatherInfo";
import Footer from "@/sections/footer/Footer";
export default function HomePage() {
  return (
    <div className={styles.main__con}>
      <Nav />
      <WeatherMain />
      <Footer/>
    </div>
  );
}
