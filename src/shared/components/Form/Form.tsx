"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "@shared/styles/Form.module.scss";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { AnyObject, InferType, ObjectSchema } from "yup";
import FormField from "./FormField";
import Button from "../btns/Button";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
type FormProps = {
  schema: ObjectSchema<FieldValues, AnyObject>;
  title: React.ReactElement;
};
export default function Form({ schema, title }: FormProps) {
  const pathname = usePathname();
  type Form = InferType<typeof schema>;
  const methods = useForm<Form>({
    resolver: yupResolver(schema),
  });
  const fields: string[] = Object.keys(schema.fields);
  const { handleSubmit } = methods;

  function submitData(data: Form): void {
    console.log(data);
    redirect("/home");
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.main__con} onSubmit={handleSubmit(submitData)}>
        <div className={styles.title}>{title}</div>

        {fields.map((field, i) => (
          <FormField
            key={i}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field}
          />
        ))}

        <Button
          title="Continue"
          func={() => submitData}
          width={50}
          type="submit"
          style={styles.main__btn}
        />
      </form>
      <div className={styles.link__con}>
        {pathname === "/auth/sign-up" ? (
          <p>
            Already have account?<Link href="/auth/log-in">Log In</Link>
          </p>
        ) : (
          <p>
            Don't have account?<Link href="/auth/sign-up">Sign Up</Link>
          </p>
        )}
      </div>
    </FormProvider>
  );
}
