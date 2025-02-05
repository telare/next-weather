import gitBtn_styles from "@/components/header/styles/GitBtn.module.scss";
import Image from "next/image";
import Link from "next/link";
export default function GitBtn() {
  return (
    <Link
      href="https://github.com/telare/next-weather"
      className={gitBtn_styles.main__con}
      target="_blank"
    >
      <Image
        src="/icons/light-mode/github_icon.png"
        alt="GitHub Icon"
        width={20}
        height={20}
      />
      Source code
    </Link>
  );
}
