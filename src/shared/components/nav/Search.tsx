"use client";
import Image from "next/image";
import styles from "@shared/styles/Nav.module.scss";
import { setCityName } from "@/providers/global-store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
export default function Search() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce({ value: inputValue, timeOut: 2000 });

  useEffect(() => {
    if (debouncedValue) {
      try {
        axios
          .get(`/api/geocode?city=${debouncedValue}`)
          .then((resp) => dispatch(setCityName(resp.data)));
      } catch (e) {
        // redirect to error page
        console.log('Erro in fetching coordinates:', e);
      }
    }
  }, [debouncedValue]);
  return (
    <div className={styles.search_main__con}>
      <input
        type="text"
        placeholder="Search Here..."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className={styles.search_shortcuts__con}>
        <Image
          src="/icons/night-mode/ctrl.png"
          width={40}
          height={40}
          alt="Ctrl"
        />
        <Image
          src="/icons/night-mode/t_button.png"
          width={30}
          height={30}
          alt="T"
        />
      </div>
    </div>
  );
}
