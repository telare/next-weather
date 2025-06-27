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

export type ConfiguredStatusCode = 201 | 400 | 401 | 405 | 409 | 500;
const serverResponsesConfig: {
  [key in ConfiguredStatusCode]: string;
} = {
  201: "Successfully logged in",
  400: "Invalid data provided",
  401: "Invalid email or password",
  405: "Method Not Allowed",
  409: "User already exists",
  500: "Internal server error",
};

function serverResponseMessageGenerator(
  statusCode: ConfiguredStatusCode
): string {
  const isCodeConfigured: boolean = Boolean(serverResponsesConfig[statusCode]);
  if (isCodeConfigured) {
    return serverResponsesConfig[statusCode];
  } else {
    throw new Error("Not supported status code for server response configs");
  }
}

//tokens-related
const tokenNames: {
  access: string;
  refresh: string;
} = {
  access: "accessToken",
  refresh: "refreshToken",
};

function getJWTSecretKey(): string {
  const jwtSecretKey: string | undefined = process.env.JWT_SECRET_KEY;
  if (!jwtSecretKey || jwtSecretKey?.length === 0) {
    throw new Error("JWT secret missing");
  }
  return jwtSecretKey;
}
function jwtTokensGenerator(
  userCredentials: SecuredUser,
  customJWTSecretKey?: string
): {
  accessToken: string;
  refreshToken: string;
} {
  const jwtSecretKey = customJWTSecretKey
    ? customJWTSecretKey
    : getJWTSecretKey();
  const accessToken: string = jwt.sign(
    {
      name: userCredentials.name,
      id: userCredentials.id,
      email: userCredentials.email,
    },
    jwtSecretKey,
    {
      algorithm: "HS256",
      expiresIn: "15m",
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
      path: "/",
    });
    cookieStore.set(tokenNames.access, accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 15 * 60 * 1000),
      sameSite: "lax",
      path: "/",
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`Failed to set authentication cookies: ${e.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while setting authentication cookies."
      );
    }
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
  getJWTSecretKey,
  isUser,
  isSecuredUser,
  serverResponseMessageGenerator,
};
