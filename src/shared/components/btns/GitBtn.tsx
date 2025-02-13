"use client"
import gitBtn_styles from "@/sections/header/styles/GitBtn.module.scss";
import { useRouter } from "next/navigation";
import Button from "./Button";
export default function GitBtn() {
  const router = useRouter()
  return (
    <Button
      type="button"
      title="Source code"
      func={() => router.push("https://github.com/telare/next-weather")}
      style={gitBtn_styles.main__con}
      width={40}
      image={{
        src: "/icons/light-mode/github_icon.png",
        height: 20,
        width: 20,
      }}
    />
  );
}
