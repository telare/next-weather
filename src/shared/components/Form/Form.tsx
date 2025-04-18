"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "@shared/styles/Form.module.scss";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { AnyObject, InferType, ObjectSchema } from "yup";
import FormField from "./FormField";
import Button from "../btns/Button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "@/shared/types/User";
import { useRouter } from "next/navigation";
import { customToast } from "../Toast/Toast";
type FormProps = {
  schema: ObjectSchema<FieldValues, AnyObject>;
  title: React.ReactElement;
  type: "log-in" | "sign-up";
};
export default function Form({ schema, title, type }: FormProps) {
  const router = useRouter();
  const pathname = usePathname();
  type Form = InferType<typeof schema>;
  const methods = useForm<Form>({
    resolver: yupResolver(schema),
  });
  const fields: string[] = Object.keys(schema.fields);
  const { handleSubmit } = methods;

  async function signUp(data: Form): Promise<void> {
    if ("name" in data && "email" in data && "password" in data) {
      const userData: User = {
        id: self.crypto.randomUUID(),
        name: (data as User).name,
        email: (data as User).email,
        password: (data as User).password,
      };
      try {
        const res = await fetch("/api/auth/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const result = await res.json();
        if (res.status === 201) {
          customToast(
            "Sign up approved, welcome",
            "Now you can use all features.",
            "success"
          );
          router.push("/home");
        } else {
          customToast("Sign up failed", result.message, "error");
        }
      } catch (e: unknown) {
        customToast("Error happenned", "Someting failed", "error");
        throw new Error(e as string);
      }
    }
  }

  async function logIn(data: Form): Promise<void> {
    try {
      const res = await fetch("/api/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userData: {
        isUserVerifed: boolean;
      } = await res.json();
      if (userData.isUserVerifed === true) {
        customToast(
          "Log in approved, welcome",
          "Now you can use all features.",
          "success"
        );
        router.push("/home");
      } else {
        customToast("Log in failed, try again", "Invalid credentials", "error");
        router.push("/auth/sign-up");
      }
    } catch (e: unknown) {
      customToast(
        "Error happenned",
        "Someting failed during the procces",
        "error"
      );
      throw new Error(e as string);
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className={styles.main__con}
        onSubmit={handleSubmit(type === "log-in" ? logIn : signUp)}
      >
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
          func={type === "log-in" ? () => logIn : () => signUp}
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
            Don&apos;t have account?<Link href="/auth/sign-up">Sign Up</Link>
          </p>
        )}
      </div>
    </FormProvider>
  );
}
