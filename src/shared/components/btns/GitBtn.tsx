"use client";
import styles from "@shared/styles/Nav.module.scss";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { githubIcon } from "@/utils/Icons";
export default function GitBtn() {
  const router = useRouter();
  return (
    <Button
      type="button"
      ariaLabel="View source code on GitHub"
      func={() => router.push("https://github.com/telare/next-weather")}
      className={styles.navGitBtn}
      width={40}
      icon={githubIcon}
    />
  );
}
