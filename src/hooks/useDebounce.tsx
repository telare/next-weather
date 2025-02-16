"use client";
import { useEffect, useState } from "react";

type UseDebounceProps<T> = {
  value: T;
  timeOut: number;
};
export default function useDebounce<T>({
  value,
  timeOut,
}: UseDebounceProps<T>) {
  const [debouncedValue, setDebouncedValue] = useState<T>();
  useEffect(() => {
    const timeOutFunc = setTimeout(() => {
      setDebouncedValue(value);
    }, timeOut);
    return () => {
      clearTimeout(timeOutFunc);
    };
  }, [value]);

  return debouncedValue
}
