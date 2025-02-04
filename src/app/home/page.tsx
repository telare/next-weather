import Nav from "components/header/Nav";
import home_styles from "./Home.module.scss";
export default function HomePage() {
  return (
    <div className={home_styles.main__con}>
      
      <Nav />
      {/* main info */}
      <div></div>
    </div>
  );
}
