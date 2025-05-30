"use client";
import ThemeToggleBtn from "@shared/components/btns/ThemeToggleBtn";
import Search from "./Search";
import LogOutBtn from "../btns/LogOutBtn";
import Links from "./Links";
import styles from "@shared/styles/Nav.module.scss";
import GitBtn from "../btns/GitBtn";
import Hamburger from "hamburger-react";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <div className={styles.navCon} tabIndex={0}>
      <Links />
      <div className={styles.hamburgerLogo}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      <div className={styles.navContent} aria-expanded={isOpen}>
        <Search />
        <div className={styles.navContentBtns}>
          <ThemeToggleBtn />
          <GitBtn />
          <LogOutBtn />
        </div>
      </div>
    </div>
  );
}
