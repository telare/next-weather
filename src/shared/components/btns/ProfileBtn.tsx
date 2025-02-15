import profileBtn_styles from "@/sections/header/styles/ProfileBtn.module.scss";
import Button from "./Button";
import { redirect } from "next/navigation";
export default function ProfileBtn() {
  return (
    <Button
      type="button"
      func={() => redirect("/profile")}
      style={profileBtn_styles.main__con}
      width={40}
      image={{
        src: "/icons/night-mode/user_icon.png",
        height: 40,
        width: 40,
      }}
    />
  );
}
