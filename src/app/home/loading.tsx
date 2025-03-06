import { Skeleton } from "@/components/ui/skeleton";
import styles from "./styles/Home.module.scss";
import nav_styles from "@shared/styles/Nav.module.scss";
import main_styles from "./styles/WeatherInfo.module.scss";
export default function Loading() {
  return (
    <Skeleton className={styles.main__con}>
      {/* nav */}
      <Skeleton className={nav_styles.nav_main__con}/>
      {/* main */}
      <Skeleton className={main_styles.main__con} />
      {/* Footer */}
      <Skeleton className={main_styles.main__con} />
    </Skeleton>
  );
}
