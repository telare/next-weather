"use client";
import styles from "@shared/styles/Nav.module.scss";
import { updateLocation } from "@/providers/globalStore";
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
  const searchInputID = "citySearch";
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
          .then((resp) => dispatch(updateLocation(resp.data)))
          .then(() => router.back());
      } catch (e: unknown) {
        //redirect to error page
        throw new Error(e as string);
      }
    }
  }, [debouncedValue, dispatch, router]);
  return (
    <search
      className={styles.searchCon}
      role="search" // for legacy support
      aria-label="City search" // Keep this for now, though it might become redundant over time
    >
      <label htmlFor={searchInputID} className={styles.searchLabel}>
        Search for a city
      </label>
      <input
        type="search"
        id={searchInputID}
        placeholder="Search Here..."
        aria-describedby="searchShortcut"
        onClick={() => {
          if (pathname === "/home") {
            router.push(pathname + "/search");
          }
        }}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div
        id="searchShortcut"
        className={styles.searchShortCut}
        aria-label="Search shortcut, press Command + F"
        title="Press Command + F to search for a city"
      >
        <kbd aria-label="Control key">{commandIcon}</kbd>
        <span>+</span>
        <kbd aria-label="F key">F</kbd>
      </div>
    </search>
  );
}
