"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AuthFormLinks() {
  const { section } = useParams<{ section: "log-in" | "sign-up" }>();
  return (
    <p>
      {section === "sign-up" ? (
        <>
          Already have account?
          <Link href="/auth/log-in" data-cy="form-link-logIn">
            Log In
          </Link>
        </>
      ) : (
        <>
          Don&apos;t have account?
          <Link href="/auth/sign-up" data-cy="form-link-signUp">
            Sign Up
          </Link>
        </>
      )}
    </p>
  );
}
