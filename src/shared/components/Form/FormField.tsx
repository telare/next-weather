"use client";
import { useFormContext } from "react-hook-form";
import styles from "@shared/styles/Form.module.scss";
type FormField = {
  name: string;
  type: "text" | "password";
  placeholder: string;
};
export default function FormField({ name, type, placeholder }: FormField) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={styles.formField}>
      <input
        placeholder={placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}
        type={type}
        {...register(name)}
      />
      <div className={styles.errorMessage}>{errors[name]?.message && <p>{errors[name]?.message.toString()}</p>}</div>
    </div>
  );
}
