import ThemeToggleBtn from "shared/components/btns/ThemeToggleBtn";
import Search from "./Search";
import ProfileBtn from "shared/components/btns/ProfileBtn";
import Links from "./Links";
import nav_styles from "./styles/Nav.module.scss";
import GitBtn from "shared/components/btns/GitBtn";
export default function Nav() {
  return (
    <div className={nav_styles.main__con}>
      <Links />
      <div className={nav_styles.child__con}>
        <Search />
        <ThemeToggleBtn />
        <GitBtn />
        <ProfileBtn />
      </div>
    </div>
  );
}
