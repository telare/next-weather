import Link from "next/link";
import styles from "@shared/styles/Nav.module.scss";
import { usePathname } from "next/navigation";
export default function Links() {
  const pathName = usePathname();
  return (
    <div className={styles.links_main__con}>
      <ul>
        <li>
          <Link
            href="/home"
            className={
              pathName === "/home" ? styles.links_link__active : styles.links_link
            }
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/favorite"
            className={
              pathName === "/favorite"
                ? styles.links_link__active
                : styles.links_link
            }
          >
            Favorite
          </Link>
        </li>
      </ul>
    </div>
  );
}
