import { useQuery } from "@tanstack/react-query";
import styles from "../styles/WeatherInfo.module.scss";
import MetricCart from "@/shared/components/Carts/MetricCart";
export default function CurrentWeather() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('/weather/current-weather')
      return await response.json()
    },
  })
  console.log(data)
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
          <h1>1°</h1>
        </div>
      </div>
      <div className={styles.current_weather__con_footer}>
        {/* <MetricCart/> */}
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
        
{/* <MetricCart/> */}
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
