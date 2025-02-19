import styles from "@shared/styles/Nav.module.scss";
import Button from "./Button";
import { redirect } from "next/navigation";
import { userIcon } from "@/utils/Icons";
export default function ProfileBtn() {
  return (
    <Button
      type="button"
      func={() => redirect("/profile")}
      style={styles.profile_btn}
      width={40}
      icon={userIcon}
    />
  );
}
