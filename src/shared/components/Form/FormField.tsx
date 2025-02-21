"use client";
import { FieldError, useFormContext } from "react-hook-form";
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
  const error: FieldError | undefined = errors[name] as FieldError | undefined;
  return (
    <div className={styles.field__con}>
      <input
        placeholder={placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}
        type={type}
        {...register(name)}
        className={styles.field}
      />
      <div>{error && error.message && <p>{error.message}</p>}</div>
    </div>
  );
}
