import Image from "next/image";
import styles from "../../styles/MetricCart.module.scss";
type MetricCart = {
  title: string;
  icon?: string;
  size: "standart" | "large";
  renderComponent: React.ReactElement;
  description: string;
};
export default function MetricCart() {
  return (
    // <div
    //   className={
    //     size === "standart" ? styles.main__con : styles.main__con_large
    //   }
    // >
    <div className={styles.main__con}>
      <div className={styles.main__con_header}>
        <Image
          src="/icons/night-mode/thermometer.png"
          alt="Metric Icon"
          width={20}
          height={20}
        />
        <h3>Feels Like</h3>
      </div>
      <div className={styles.main__con_render_component}>
        {/* {renderComponent} */}
        <h2>-6°</h2>
      </div>
      <div className={styles.main__con_footer}>
        <p>Smth kfdfkfo</p>
      </div>
    </div>
  );
}
