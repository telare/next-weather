"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "@shared/styles/Form.module.scss";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { AnyObject, InferType, ObjectSchema } from "yup";
import FormField from "./FormField";
import Button from "../btns/Button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "@shared/types/User";
import { useRouter } from "next/navigation";
import { handleAuthentication } from "./utils/utils";
import { customToast } from "../Toast/Toast";
export type AuthFormProps = {
  schema: ObjectSchema<FieldValues, AnyObject>;
  title: React.ReactElement;
  type: "log-in" | "sign-up";
};
export default function Form({ schema, title, type }: AuthFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  type Form = InferType<typeof schema>;
  const methods = useForm<Form>({
    resolver: yupResolver(schema),
  });
  const fields: string[] = Object.keys(schema.fields);
  const { handleSubmit } = methods;
  function onSubmit(data: Form) {
    handleAuthentication(data as User, type)
      .then((res) => {
        customToast("Authentication passed, wellcome", res, "success");
        return router.push("/home");
      })
      .catch((e) => {
        customToast("Authentication failed", e, "error");
        return router.push("/auth/sign-up");
      });
  }
  return (
    <FormProvider {...methods}>
      <form className={styles.formCon} onSubmit={handleSubmit(onSubmit)} role="form">
        <div className={styles.formHeader}>{title}</div>
        <div className={styles.formFieldsCon}>
          {fields.map((field, i) => (
            <FormField
              key={i}
              name={field}
              type={field === "password" ? "password" : "text"}
              placeholder={field}
            />
          ))}
        </div>
        <div className={styles.formFooter}>
          <Button
            title="Continue"
            alt="Continue"
            width={50}
            type="submit"
            style={styles.submitBtn}
          />
          <div className={styles.navigationLinks}>
            {pathname === "/auth/sign-up" ? (
              <p>
                Already have account?<Link href="/auth/log-in">Log In</Link>
              </p>
            ) : (
              <p>
                Don&apos;t have account?
                <Link href="/auth/sign-up">Sign Up</Link>
              </p>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
