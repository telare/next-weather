"use client";
import styles from "@shared/styles/MetricCart.module.scss";
type MetricCart = {
  title?: string;
  description: string | React.ReactNode;
  icon?: React.ReactElement;
  border?: boolean;
  size: "standart" | "large";
  renderComponent?: React.ReactElement;
  mainInfo?: string;
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
        size === "standart"
          ? styles.container
          : [styles.container, styles.containerLarge].join(" ")
      }
    >
      <div className={styles.header}>
        {icon && icon}
        <h3>{title}</h3>
      </div>
      <div className={styles.content}>
        {renderComponent ? renderComponent : <p>{mainInfo}</p>}
      </div>
      <div className={styles.footer}>
        {typeof description === "string" ? <p>{description}</p> : description}
      </div>
    </div>
  );
}
