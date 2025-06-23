"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { githubIcon } from "@/utils/Icons";
export default function GitBtn() {
  const router = useRouter();
  return (
    <Button
      dataCyPrefix="git"
      type="button"
      text="Source Code"
      ariaLabel="View source code on GitHub"
      func={() => router.push("https://github.com/telare/next-weather")}
      width={40}
      icon={githubIcon}
    />
  );
}
