'use client';
import styles from "@shared/styles/Nav.module.scss";
import Image from "next/image";
import { useTheme } from "next-themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
export default function ThemeToggleBtn() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.theme_btn}>
          <Image
            src="/icons/night-mode/light-mode_icon.png"
            alt="Mode"
            width={40}
            height={40}
          />
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
