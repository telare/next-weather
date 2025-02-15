"use client";
import { useQuery } from "@tanstack/react-query";
import styles from "../styles/WeatherInfo.module.scss";
import MetricCart from "@/shared/components/Carts/MetricCart";
import { DataContext } from "@/providers/data-provider";
import { useContext } from "react";
export default function CurrentWeather() {
  const data = useContext(DataContext);

  return (
    <div className={styles.current_weather__con}>
      <div className={styles.current_weather__con_header}>
        <p>Saturday</p>
        <p>17:42:57</p>
      </div>
      <div className={styles.current_weather__con_main}>
        <div>
          <h3>New York</h3>
        </div>
        <div>
          
          {/* <h1>{data ? Math.floor(data?.temperature.current_temp) : 1}°</h1> */}
        </div>
      </div>
      <div className={styles.current_weather__con_footer}>
        <MetricCart title="" size="standart" />
        {/* <div className={styles.current_weather__con_footer_weather}>
          <Image
            src="/icons/night-mode/thermometer.png"
            width={20}
            height={20}
            alt=""
          />
          <p>Light Rain</p>
          <div>
            <p>Low:-1°</p>
            <p>High:2°</p>
          </div>
        </div> */}

        <MetricCart title="Wind" size="standart" />
        {/* <div className={styles.current_weather__con_footer_wind}>
        
          <div>
            <Image
              src="/icons/night-mode/wind.png"
              alt="Wind"
              width={20}
              height={20}
            />
            <h3>Wind</h3>
          </div>
          <div>
           
          </div>
        </div> */}
      </div>
    </div>
  );
}
