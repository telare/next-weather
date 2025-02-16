"use client";
import Image from "next/image";
import search_styles from "./styles/Search.module.scss";
import { setCityName } from "@/providers/global-store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
export default function Search() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce({ value: inputValue, timeOut: 2000 });

  useEffect(() => {
    console.log("Debounced Value:", debouncedValue);
    if (debouncedValue) {
      dispatch(setCityName(debouncedValue));
    }
  }, [debouncedValue]);
  return (
    <div className={search_styles.main__con}>
      <input
        type="text"
        placeholder="Search Here..."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className={search_styles.shortcuts__con}>
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
