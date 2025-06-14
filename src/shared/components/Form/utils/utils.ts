import { User } from "@prisma/client";
import { AuthFormProps } from "../Form";
import { SecuredUser } from "@/utils/apiUtils";

export async function handleAuthentication(
  formData: User,
  type: AuthFormProps["type"]
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
