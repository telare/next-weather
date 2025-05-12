import Skeleton from "@/shared/components/Skeletons/Skeleton";
import styles from "./styles/Home.module.scss";
import nav_styles from "@shared/styles/Nav.module.scss";
import main_styles from "./styles/WeatherInfo.module.scss";
export default function Loading() {
  return (
    <Skeleton className={styles.wrapper}>
      {/* nav */}
      <Skeleton className={nav_styles.navCon} />
      {/* main */}
      <Skeleton className={main_styles.wrapper} />
      {/* Footer */}
      <Skeleton className={main_styles.wrapper} />
    </Skeleton>
  );
}
