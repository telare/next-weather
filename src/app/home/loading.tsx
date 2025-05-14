import Skeleton from "@shared/components/Skeletons/Skeleton";
import styles from "./styles/Home.module.scss";
import navStyles from "@shared/styles/Nav.module.scss";
import mainStyles from "./styles/WeatherInfo.module.scss";
export default function Loading() {
  return (
    <Skeleton className={styles.homeCon}>
      {/* nav */}
      <Skeleton className={navStyles.navCon} />
      {/* main */}
      <Skeleton className={mainStyles.containerMain} />
      {/* Footer */}
      <Skeleton className={mainStyles.containerMain} />
    </Skeleton>
  );
}
