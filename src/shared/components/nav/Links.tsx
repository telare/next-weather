import Link from "next/link";
import styles from "@shared/styles/Nav.module.scss";
export default function Links() {
  return (
    <div className={styles.navLinksCon}>
      <ul>
        <li>
          <Link href="/home" className={styles.link}>
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
}
