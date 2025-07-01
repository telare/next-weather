"use client";
import Form from "@/shared/components/Form/Form";
import styles from "../auth.module.scss";
import ThemeToggleBtn from "@shared/components/btns/ThemeToggleBtn";
import AuthFormLinks from "../utility/AuthFormLinks";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { handleAuthentication, isUser, schemas } from "../utility/utils";
import { customToast } from "@/shared/components/Toast/Toast";
import { useAppDispatch } from "@/providers/dataProvider/globalStore/globalStore";
import { updateUser } from "@/providers/dataProvider/globalStore/actions/user/types";

export default function AuthPage() {
  const router = useRouter();
  const { section } = useParams<{ section: "log-in" | "sign-up" }>();
  const dispatch = useAppDispatch();
  async function onSubmit(data: unknown): Promise<void> {
    if (!isUser(data, section)) {
      throw new Error("Invalid user data");
    }
    try {
      const authResult = await handleAuthentication(data, section);
      customToast(
        "Authentication passed, welcome",
        authResult.message,
        "success"
      );
      dispatch(updateUser(authResult.user));
      return router.push("/home");
    } catch (e: unknown) {
      customToast("Authentication failed", e as string, "error");
      return router.push("/auth/sign-up");
    }
  }

  const formTitle: React.ReactElement =
    section === "log-in" ? (
      <>
        <h1>Welcome Back!</h1>
        <p>Log In in with your data</p>
      </>
    ) : (
      <>
        <h1>
          Start Your Journey
          <br /> With Us
        </h1>
        <p>Register with your data</p>
      </>
    );
  return (
    <main className={styles.wrapper}>
      <div className={styles.themeBtnCon}>
        <ThemeToggleBtn />
      </div>
      <Form
        dataCyPrefix="auth"
        onSubmit={onSubmit}
        title={formTitle}
        formLinks={<AuthFormLinks />}
        schema={schemas[section] ?? schemas["sign-up"]}
      />
    </main>
  );
}
