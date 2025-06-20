"use client";
import { User } from "@prisma/client";
import { SecuredUser } from "@/utils/apiUtils";
import { AnyObject, object, ObjectSchema, string } from "yup";
import { FieldValues } from "react-hook-form";

export type AuthSection = "log-in" | "sign-up";
const logInSchema = object({
  email: string().email("Invalid email address").required("Email is required"),
  password: string().min(4, "At least 4 symbols").max(10, "Maximum 10 symbols"),
});
const signUpSchema = object({
  name: string().min(2, "At least 2 symbols").max(7, "Maximum 7 symbols"),
  email: string().email("Invalid email address").required("Email is required"),
  password: string().min(4, "At least 4 symbols").max(10, "Maximum 10 symbols"),
});

const schemas: {
  [key: string]: ObjectSchema<FieldValues, AnyObject>;
} = {
  "log-in": logInSchema,
  "sign-up": signUpSchema,
};

function isUser(data: unknown, section: AuthSection): data is User {
  if (!(typeof data === "object") || data == null) {
    return false;
  }
  if (section === "log-in") {
    if (logInSchema.validateSync(data)) {
      return true;
    }
  }
  if (section === "sign-up") {
    if (signUpSchema.validateSync(data)) {
      return true;
    }
  }
  return false;
}
async function handleAuthentication(
  formData: User,
  type: "log-in" | "sign-up"
): Promise<{
  message: string;
  user: SecuredUser;
}> {
  const userData: User = {
    id: self.crypto.randomUUID(),
    name: formData.name || "",
    email: formData.email,
    password: formData.password,
  };
  try {
    const res = await fetch(`/api/auth/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
    const result = await res.json();
    const resultObj = {
      message: result.message,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      },
    };
    return resultObj;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e.message;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export { schemas, handleAuthentication, isUser };
