import profileBtn_styles from "@/components/header/styles/ProfileBtn.module.scss";
import Image from "next/image";
import Link from "next/link";
export default function ProfileBtn() {
  return (
    <Link href="/profile" className={profileBtn_styles.main__con}>
      <Image
        src="/icons/night-mode/user_icon.png"
        alt="User Icon"
        width={40}
        height={40}
      />
    </Link>
  );
}
