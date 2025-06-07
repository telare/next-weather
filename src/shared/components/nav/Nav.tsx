"use client";
import ThemeToggleBtn from "@shared/components/btns/ThemeToggleBtn";
import Search from "./Search";
import LogOutBtn from "../btns/LogOutBtn";
import Links from "./Links";
import styles from "@shared/styles/Nav.module.scss";
import GitBtn from "../btns/GitBtn";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function Nav() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 850px)");
  const hamburgerControlsID = "primary-navigation-menu";
  return (
    <nav className={styles.navCon} aria-label="Main navigation">
      <Links />
      <button
        className={styles.hamburger}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={hamburgerControlsID}
      >
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </button>
      <div
        id={hamburgerControlsID}
        className={styles.navContent}
        aria-hidden={isMobile ? !isOpen : false}
        aria-label="Search input and navigation buttons"
      >
        <Search />
        <div className={styles.navContentBtns} aria-label="Navigation buttons">
          <ThemeToggleBtn />
          <GitBtn />
          <LogOutBtn />
        </div>
      </div>
    </nav>
  );
}
