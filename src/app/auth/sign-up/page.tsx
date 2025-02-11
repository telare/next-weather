"use client";
import styles from "../auth.module.scss";
import Form from "@/shared/components/Form/Form";
import { object, string } from "yup";
import ThemeToggleBtn from "@/shared/components/btns/ThemeToggleBtn";
export default function SignUpPage() {
  const signUpSchema = object({
    name: string(),
    email: string(),
    password: string(),
  });
  const title: React.ReactElement = (
    <div className={styles.title__con}>
      <h2>
        Start Your Journey
        <br /> With Us
      </h2>
      <p>Register with your data</p>
    </div>
  );
  return (
    <div className={styles.main__con}>
      <div className={styles.form__con}>
        <div>
          <ThemeToggleBtn />
        </div>
        <Form schema={signUpSchema} title={title} />
      </div>
    </div>
  );
}
