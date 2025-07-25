"use client";
import Button from "@shared/components/btns/Button";
import styles from "@shared/styles/ErrorPage.module.scss";
import { redirect } from "next/navigation";
export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.errorCon}>
      <div className={styles.errorTextCon}>
        <h1>Something went wrong!</h1>
        <p>Error message: {error.message}</p>
      </div>
      <Button
        dataCyPrefix="tryAgain"
        func={() => redirect("/auth/log-in")}
        text="Try again"
        type="button"
        className={styles.resetBtn}
      />
    </div>
  );
}
