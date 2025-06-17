"use client";
import { useFormContext } from "react-hook-form";
import styles from "@shared/styles/Form.module.scss";
type FormField = {
  name: string;
  type: "text" | "password";
  placeholder: string;
  dataCyPrefix: string;
};
export default function FormField({
  name,
  type,
  placeholder,
  dataCyPrefix,
}: FormField) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorId = `${name}-error`;
  return (
    <div className={styles.formField}>
      <input
        placeholder={placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}
        type={type}
        data-cy={`${dataCyPrefix}-form-${name}-field`}
        aria-label={placeholder}
        aria-invalid={errors[name] ? "true" : "false"}
        aria-errormessage={errors[name] ? errorId : undefined}
        aria-atomic="true"
        aria-describedby={errors[name] ? errorId : undefined} // for legacy support
        {...register(name)}
      />
      {errors[name] && (
        <span
          className={styles.errorMessage}
          id={errorId}
          aria-live="polite"
          aria-atomic="true"
        >
          {errors[name]?.message && (
            <p data-cy={`${dataCyPrefix}-form-${name}-field-error`}>
              {errors[name]?.message.toString()}
            </p>
          )}
        </span>
      )}
    </div>
  );
}
