import themeToggleBtn_styles from "@/components/header/styles/ThemeToggleBtn.module.scss";
import Image from "next/image";

export default function ThemeToggleBtn() {
  return (
    <button className={themeToggleBtn_styles.main__con}>
      <Image
        src="/icons/night-mode/light-mode_icon.png"
        alt="Light Mode"
        width={40}
        height={40}
      />
    </button>
  );
}
