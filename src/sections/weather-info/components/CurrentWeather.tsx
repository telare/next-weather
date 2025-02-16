"use client";
import { useQuery } from "@tanstack/react-query";
import styles from "../styles/WeatherInfo.module.scss";
import MetricCart from "@/shared/components/Carts/MetricCart";
import { DataContext } from "@/providers/data-provider";
import { useContext, useEffect } from "react";
export default function CurrentWeather() {
  const data = useContext(DataContext);
  if(data ){
    console.log(data.name)
  }
  return (
    <div className={styles.current_weather__con}>
      <div className={styles.current_weather__con_header}>
        <p>Saturday</p>
        <p>17:42:57</p>
      </div>
      <div className={styles.current_weather__con_main}>
        <div>
          <h3>{ data && data.name && data.name}</h3>
        </div>
        {data ? (
          <div>
            <div>
              {/* {data && <h1>{Math.floor(data?.temperature.current_temp)}°</h1>} */}
              <h1>1°</h1>
            </div>
            <div className={styles.current_weather__con_footer}>
              {/* <MetricCart
                title={data.weather.descr}
                size="standart"
                description={`Low: ${data.temperature.min_temp} High: ${data.temperature.max_temp}`}
                mainInfo={data.weather.icon}
              /> */}
             

              {/* <MetricCart title="Wind" size="standart" /> */}
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
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
