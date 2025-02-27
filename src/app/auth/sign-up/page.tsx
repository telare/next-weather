"use client";
import styles from "../auth.module.scss";
import Form from "@/shared/components/Form/Form";
import { object, string } from "yup";
import ThemeToggleBtn from "@/shared/components/btns/ThemeToggleBtn";
export default function SignUpPage() {
  const signUpSchema = object({
    name: string().min(2, "At least 2 symbols").max(7, "Maximum 7 symbols"),
    email: string()
      .email("Invalid email address" )
      .required("Email is required"),
    password: string()
      .min(4,"At least 4 symbols")
      .max(10, "Maximum 10 symbols"),
  });
  const title: React.ReactElement = (
    <div>
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
        <div className={styles.themeBtn__con}>
          <ThemeToggleBtn />
        </div>
        <Form schema={signUpSchema} title={title} type="sign-up" />
      </div>
    </div>
  );
}
