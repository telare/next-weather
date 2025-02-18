"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "@shared/styles/Form.module.scss";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { AnyObject, InferType, ObjectSchema } from "yup";
import FormField from "./FormField";
import Button from "../btns/Button";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "@/shared/types/User";
import { useRouter } from "next/navigation";
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
    if ("password" in data) {
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
        const result = await res;
        console.log(result);
        if (result.status === 200) {
          router.push("/home");
        }
      } catch (e) {
        console.log(e);
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
        userVerifed: boolean;
      } = await res.json();
      if (userData.userVerifed === true) {
        redirect("/home");
      } else {
        redirect("/auth/sign-up");
      }
    } catch (e) {
      console.log(e);
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
            Don't have account?<Link href="/auth/sign-up">Sign Up</Link>
          </p>
        )}
      </div>
    </FormProvider>
  );
}
