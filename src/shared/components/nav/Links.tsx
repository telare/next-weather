import Link from "next/link";
import styles from "@shared/styles/Nav.module.scss";
export default function Links() {
  return (
    <ul className={styles.navLinksCon} aria-label="Navigation links">
      <li>
        <Link href="/home" className={styles.link}>
          Home
        </Link>
      </li>
    </ul>
  );
}
