import Nav from "@/sections/header/Nav";
import home_styles from "./Home.module.scss";
import WeatherMain from "@/sections/weather-info/WeatherInfo";
export default function HomePage() {
  return (
    <div className={home_styles.main__con}>
      <Nav />
      <WeatherMain />
    </div>
  );
}
