"use client";
import Form from "@/shared/components/Form/Form";
import styles from "../auth.module.scss";
import { object, string } from "yup";
import ThemeToggleBtn from "@/shared/components/btns/ThemeToggleBtn";
export default function LogInPage() {
  const logInSchema = object({
    email: string(),
    password: string(),
  });

  const title: React.ReactElement = (
    <div className={styles.title__con}>
      <h2 style={{ color: "white", textAlign: "center" }}>Wellcome Back!</h2>
      <p style={{ color: "white" }}>Log In in with your data</p>
    </div>
  );
  return (
    <div className={styles.main__con}>
      <div className={styles.form__con}>
        <div>
          <ThemeToggleBtn />
        </div>
        <Form schema={logInSchema} title={title} />
      </div>
    </div>
  );
}
