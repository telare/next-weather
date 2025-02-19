'use client'
import ThemeToggleBtn from "shared/components/btns/ThemeToggleBtn";
import Search from "./Search";
import ProfileBtn from "@shared/components/btns/ProfileBtn";
import Links from "./Links";
import styles from "@shared/styles/Nav.module.scss";
import GitBtn from "@shared/components/btns/GitBtn";
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
