"use client";
import styles from "../../styles/WeatherInfo.module.scss";
import { useEffect, useState } from "react";
export default function Clock() {
  const [date, setDate] = useState<Date>(() => {
    return new Date();
  });
  const [time, setTime] = useState<{ time: string; date: string }>({
    time: "00:00:00 AM",
    date: "2/21/2025",
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 2000);
    setTime({
      time: date.toLocaleTimeString(),
      date: date.toLocaleDateString(),
    });
    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return (
    <div className={styles.clockCon}>
      <p>{time.date}</p>
      <p>{time.time}</p>
    </div>
  );
}
