"use client";
import {  useFormContext } from "react-hook-form";
import styles from "@shared/styles/Form.module.scss";
type FormField = {
  name: string;
  type: "text" | "password";
  placeholder: string;
};
export default function FormField({ name, type, placeholder }: FormField) {
  const {
    register,
  } = useFormContext();
  return (
    <div className={styles.field__con}>
      <input
        placeholder={placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}
        type={type}
        {...register(name)}
        className={styles.field}
      />
      <div></div>
      {/* {error && error.message && <p>{error.message}</p>} */}
    </div>
  );
}
