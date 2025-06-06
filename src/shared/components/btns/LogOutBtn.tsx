import styles from "@shared/styles/Nav.module.scss";
import Button from "./Button";
import { redirect } from "next/navigation";
export default function AuthBtn() {
  return (
    <Button
      type="button"
      func={() => redirect("/auth/log-in")}
      className={styles.navLogOutBtn}
      text="Log Out"
      width={40}
    />
  );
}
