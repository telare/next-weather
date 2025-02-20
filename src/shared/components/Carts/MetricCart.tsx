"use client";
import styles from "../../styles/MetricCart.module.scss";
type MetricCart = {
  title?: string;
  description: string;
  icon?: React.ReactElement;
  border?: boolean;
  size: "standart" | "large";
  renderComponent?: React.ReactElement;
  mainInfo: string;
};
export default function MetricCart({
  title,
  description,
  icon,
  size,
  renderComponent,
  mainInfo,
}: MetricCart) {
  return (
    <div
      className={
        size === "standart" ? styles.main__con : styles.main__con_large
      }
    >
      <div className={styles.main__con_header}>
        {icon && icon}
        <h3>{title}</h3>
      </div>
      <div className={styles.main__con_render_component}>
        {renderComponent ? renderComponent : mainInfo}
      </div>
      <div className={styles.main__con_footer}>
        <p>{description}</p>
      </div>
    </div>
  );
}
