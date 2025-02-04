import gitBtn_styles from "@/components/header/styles/GitBtn.module.scss";
import Image from "next/image";
export default function GitBtn() {
  return (
    <button className={gitBtn_styles.main__con}>
      <Image
        src="/icons/light-mode/github_icon.png"
        alt="GitHub Icon"
        width={20}
        height={20}
      />
      Source code
    </button>
  );
}
