"use client";
import styles from "@shared/styles/ThemeBtn.module.scss";
import { useTheme } from "next-themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { lightThemeIcon, nightThemeIcon } from "@/utils/Icons";
import { useEffect, useState } from "react";
export default function ThemeToggleBtn() {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const themeValues = ["light", "dark"];
  if (isMounted) {
    return (
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button
            className={styles.themeBtn}
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            // aria-expanded={}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? nightThemeIcon : lightThemeIcon}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className={styles.themeBtnContent}>
          {themeValues.map((value, i) => (
            <DropdownMenu.Item
              key={i}
              className={styles.themeBtnContentItem}
              onSelect={() => setTheme(value)}
            >
              {value[0].toUpperCase() + value.slice(1)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  }
}
