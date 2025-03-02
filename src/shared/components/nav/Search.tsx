"use client";
import Image from "next/image";
import styles from "@shared/styles/Nav.module.scss";
import { setCityName } from "@/providers/global-store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce({ value: inputValue, timeOut: 2000 });

  useEffect(() => {
    if (debouncedValue) {
      try {
        axios
          .get(`/api/geocode?city=${debouncedValue}`)
          .then((resp) => dispatch(setCityName(resp.data))).then(()=>router.back());
      } catch (e: unknown) {
        //redirect to error page
        throw new Error(e as string);
      }
    }
  }, [debouncedValue, dispatch, router]);
  return (
    <div className={styles.search_main__con}>
      <input
        type="text"
        placeholder="Search Here..."
        onClick={() => {
          if (pathname === "/home") {
            router.push(pathname + "/search");
          }
        }}
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
