"use client";
import Form from "@shared/components/Form/Form";
import styles from "../auth.module.scss";
import { object, string } from "yup";
import ThemeToggleBtn from "@shared/components/btns/ThemeToggleBtn";
export default function LogInPage() {
  const logInSchema = object({
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    password: string()
      .min(4, "At least 4 symbols")
      .max(10, "Maximum 10 symbols"),
  });

  const title: React.ReactElement = (
    <>
      <h1>Wellcome Back!</h1>
      <p>Log In in with your data</p>
    </>
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.themeBtnCon}>
        <ThemeToggleBtn />
      </div>
      <Form dataCyPrefix="auth" schema={logInSchema} title={title} type="log-in" />
    </div>
  );
}
