import Link from "next/link";
import link_styles from "./styles/Link.module.scss";
import { usePathname } from "next/navigation";
export default function Links() {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div className={link_styles.main__con}>
      <ul>
        <li>
          <Link
            href="/home"
            className={
              pathName === "/home" ? link_styles.link__active : link_styles.link
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
                ? link_styles.link__active
                : link_styles.link
            }
          >
            Favorite
          </Link>
        </li>
      </ul>
    </div>
  );
}
