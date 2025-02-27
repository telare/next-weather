"use client";
import Button from "@/shared/components/btns/Button";
import styles from "@shared/styles/ErrorPage.module.scss";
import { redirect } from "next/navigation";
export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.main__con}>
      <h2>Something went wrong!</h2>
      <p>Error message: {error.message}</p>
      <Button
        func={() => redirect("/auth/log-in")}
        title="Try again"
        type="button"
        style={styles.reset_btn}
      />
    </div>
  );
}
