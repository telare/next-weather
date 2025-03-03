"use client";
import styles from "@shared/styles/Nav.module.scss";
import { useTheme } from "next-themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { lightThemeIcon, nightThemeIcon } from "@/utils/Icons";
export default function ThemeToggleBtn() {
  const { setTheme, theme } = useTheme();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.theme_btn}>
          {theme === "dark" ?  lightThemeIcon  :  nightThemeIcon }
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="dropdown-content">
        <DropdownMenu.Item
          className="dropdown-item"
          onSelect={() => setTheme("light")}
        >
          Light
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="dropdown-item"
          onSelect={() => setTheme("dark")}
        >
          Dark
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="dropdown-item"
          onSelect={() => setTheme("system")}
        >
          System
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
