'use client'
import ThemeToggleBtn from "shared/components/btns/ThemeToggleBtn";
import Search from "./Search";
import ProfileBtn from "../btns/ProfileBtn";
import Links from "./Links";
import styles from "@shared/styles/Nav.module.scss";
import GitBtn from "../btns/GitBtn";
export default function Nav() {
  return (
    <div className={styles.nav_main__con}>
      <Links />
      <div className={styles.nav_child__con}>
        <Search />
        <ThemeToggleBtn />
        <GitBtn />
        <ProfileBtn />
      </div>
    </div>
  );
}
