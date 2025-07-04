"use client";
import styles from "@shared/styles/Nav.module.scss";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { usePathname, useRouter } from "next/navigation";
import { commandIcon } from "@/utils/Icons";
import { useAppDispatch } from "@/providers/dataProvider/globalStore/globalStore";

import {
  updateLocationRequest,
} from "@/providers/dataProvider/globalStore/actions/location/types";

// add on success state true from the store to router.back!!!!!!
export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
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
      dispatch(updateLocationRequest(debouncedValue));
    }
  }, [debouncedValue, dispatch, router]);
  return (
    <search
      className={styles.searchCon}
      data-cy="search"
      role="search" // for legacy support
      aria-label="City search" // Keep this for now, though it might become redundant over time
    >
      <label
        htmlFor={searchInputID}
        className={styles.searchLabel}
        data-cy="search-label"
      >
        Search for a city
      </label>
      <input
        type="search"
        data-cy="search-input"
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
        data-cy="search-shortcut"
        className={styles.searchShortCut}
        aria-label="Search shortcut, press Command + F"
        title="Press Command + F to search for a city"
      >
        <kbd>{commandIcon}</kbd>
        <span>+</span>
        <kbd>F</kbd>
      </div>
    </search>
  );
}

// axios
//   .get(`/api/geocode?city=${debouncedValue}`)
//   .then((resp) =>
//     dispatch({
//       type: UPDATE_LOCATION,
//       payload: resp.data,
//     })
//   )
//   .then(() => router.back());
