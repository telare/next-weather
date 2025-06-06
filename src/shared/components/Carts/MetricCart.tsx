"use client";
import styles from "@shared/styles/MetricCart.module.scss";
type MetricCart = {
  title: string;
  ariaLabel: string;
  description: string | React.ReactNode;
  icon?: React.ReactElement;
  border?: boolean;
  mainInfo?: React.ReactNode;
};
export default function MetricCart({
  title,
  description,
  icon,
  mainInfo,
  ariaLabel,
}: MetricCart) {
  return (
    <article className={styles.metricCardContainer} aria-label={ariaLabel}>
      <header>
        {icon && icon}
        <h3>{title}</h3>
      </header>
      <div className={styles.metricCardContent}>{mainInfo}</div>
      <footer>
        {typeof description === "string" ? <p>{description}</p> : description}
      </footer>
    </article>
  );
}
