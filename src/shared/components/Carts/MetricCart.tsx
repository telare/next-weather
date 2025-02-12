"use client";
import Image from "next/image";
import styles from "../../styles/MetricCart.module.scss";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import queryClient from "@/app/lib/TanStackClient";
type MetricCart = {
  title: string;
  icon?: string;
  border?: boolean;
  size: "standart" | "large";
  renderComponent: React.ReactElement;
};
export default function MetricCart({
  title,
  icon,
  size,
  renderComponent,
}: MetricCart) {
  

  return (
    
      <div
        className={
          size === "standart" ? styles.main__con : styles.main__con_large
        }
      >
        <div className={styles.main__con_header}>
          <Image
            src={icon ? icon : "/icons/night-mode/thermometer.png"}
            alt="Metric Icon"
            width={20}
            height={20}
          />
          <h3>{title}</h3>
        </div>
        <div className={styles.main__con_render_component}>
          {renderComponent ? renderComponent : <h2>-6°</h2>}
        </div>
        <div className={styles.main__con_footer}>
          <p>Smth cart info</p>
        </div>
      </div>
    
  );
}
