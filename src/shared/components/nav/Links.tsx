import Link from "next/link";
import styles from "@shared/styles/Nav.module.scss";
import { usePathname } from "next/navigation";
export default function Links() {
  const pathName = usePathname();
  return (
    <div className={styles.navLinksCon}>
      <ul>
        <li>
          <Link
            href="/home"
            className={
              pathName === "/home" ? styles.linkActive : styles.link
            }
          >
            Home
          </Link>
        </li>
        {/* <li>
          <Link
            href="/favorite"
            className={
              pathName === "/favorite"
                ? styles.linkActive
                : styles.link
            }
          >
            Favorite
          </Link>
        </li> */}
      </ul>
    </div>
  );
}
