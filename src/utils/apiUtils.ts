import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

//errors-related
type Error = {
  message: string;
  code: number;
};
const serverError: Error = {
  message: "Internal server error",
  code: 500,
};
const reqMethodError: Error = {
  message: "Method Not Allowed",
  code: 405,
};

//tokens-related
const tokenNames: {
  access: string;
  refresh: string;
} = {
  access: "accessToken",
  refresh: "refreshToken",
};

function getJWT_Secret_Key(): string {
  const jwtSecretKey: string | undefined = getJWT_Secret_Key();
  if (!jwtSecretKey && jwtSecretKey?.length !== 0)
    throw new Error("JWT secret missing");
  return jwtSecretKey;
}
function jwtTokensGenerator(userCredentials: SecuredUser): {
  accessToken: string;
  refreshToken: string;
} {
  const jwtSecretKey: string = getJWT_Secret_Key();
  const accessToken: string = jwt.sign(
    {
      name: userCredentials.name,
      id: userCredentials.id,
      email: userCredentials.email,
    },
    jwtSecretKey,
    {
      algorithm: "HS256",
      expiresIn: "15min",
    }
  );
  const refreshToken: string = jwt.sign(
    {
      name: userCredentials.name,
      id: userCredentials.id,
      email: userCredentials.email,
    },
    jwtSecretKey,
    {
      algorithm: "HS256",
      expiresIn: "24h",
    }
  );
  const tokens: {
    accessToken: string;
    refreshToken: string;
  } = {
    accessToken,
    refreshToken,
  };
  return tokens;
}

async function jwtCookiesSetter(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(tokenNames.refresh, refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "lax",
      path: "/auth/refresh",
    });
    cookieStore.set(tokenNames.access, accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 15 * 60 * 1000),
      sameSite: "lax",
      path: "/",
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    throw new Error("");
  }
}

// user-related
function isUser(user: unknown): user is User {
  if (typeof user === "object" && user !== null && user !== undefined) {
    if (
      "id" in user &&
      "name" in user &&
      "email" in user &&
      "password" in user
    ) {
      if (
        typeof user.id === "string" &&
        typeof user.email === "string" &&
        typeof user.name === "string" &&
        typeof user.password === "string"
      )
        return true;
    }
  }
  return false;
}
function isSecuredUser(user: unknown): user is SecuredUser {
  if (typeof user === "object" && user !== null && user !== undefined) {
    if ("id" in user && "name" in user && "email" in user) {
      if (
        typeof user.id === "string" &&
        typeof user.email === "string" &&
        typeof user.name === "string"
      )
        return true;
    }
  }
  return false;
}

export type SecuredUser = Omit<User, "password">;
export {
  serverError,
  reqMethodError,
  tokenNames,
  jwtTokensGenerator,
  jwtCookiesSetter,
  getJWT_Secret_Key,
  isUser,
  isSecuredUser,
};
