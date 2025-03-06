"use client";
import styles from "@shared/styles/Nav.module.scss";
import { setCityName } from "@/providers/global-store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { commandIcon } from "@/utils/Icons";
export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce({ value: inputValue, timeOut: 2000 });

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "KeyF" && e.ctrlKey) {
        e.preventDefault();
        if (pathname === "/home") {
          router.push(pathname + "/search");
        }
        if (pathname === "/home/search") {
          router.back();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  useEffect(() => {
    if (debouncedValue) {
      try {
        axios
          .get(`/api/geocode?city=${debouncedValue}`)
          .then((resp) => dispatch(setCityName(resp.data)))
          .then(() => router.back());
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
        {commandIcon}
        <div>F</div>
      </div>
    </div>
  );
}
