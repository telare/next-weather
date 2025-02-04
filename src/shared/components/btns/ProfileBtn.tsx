import profileBtn_styles from "@/components/header/styles/ProfileBtn.module.scss";
import Image from "next/image";
export default function ProfileBtn() {
  return (
    <button className={profileBtn_styles.main__con}>
      <Image
        src="/icons/night-mode/user_icon.png"
        alt="User Icon"
        width={40}
        height={40}
      />
    </button>
  );
}
