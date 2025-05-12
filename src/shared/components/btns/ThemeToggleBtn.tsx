"use client";
import styles from "@shared/styles/Nav.module.scss";
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
  if (isMounted) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.navThemeBtn}>
            {theme === "dark" ? nightThemeIcon : lightThemeIcon}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="dropdownContent">
          <DropdownMenu.Item
            className="dropdownItem"
            onSelect={() => setTheme("light")}
          >
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="dropdownItem"
            onSelect={() => setTheme("dark")}
          >
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="dropdownItem"
            onSelect={() => setTheme("system")}
          >
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  }
}
