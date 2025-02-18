"use client";
import Form from "@/shared/components/Form/Form";
import styles from "../auth.module.scss";
import { object, string } from "yup";
import ThemeToggleBtn from "@/shared/components/btns/ThemeToggleBtn";
export default function LogInPage() {
  const logInSchema = object({
    email: string().email(),
    password: string()
      .min(4, { message: "At least 4 symbols" })
      .max(10, { message: "Maximum 10 symbols" }),
  });

  const title: React.ReactElement = (
    <div>
      <h2>Wellcome Back!</h2>
      <p>Log In in with your data</p>
    </div>
  );
  return (
    <div className={styles.main__con}>
      <div className={styles.form__con}>
        <div className={styles.themeBtn__con}>
          <ThemeToggleBtn />
        </div>
        <Form schema={logInSchema} title={title} type="log-in"/>
      </div>
    </div>
  );
}
