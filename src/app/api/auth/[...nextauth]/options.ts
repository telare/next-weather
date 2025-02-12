import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        username: {
          type: "text",
          placeholder: "Name",
        },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "testuser" }; // Mock user for testing

        if (credentials?.username === user.name) {
          return user;
        }
        return null; // Return null if authentication fails
      },
    }),
  ],
  pages: {
    signIn: "/auth/log-in",
    signOut: "/auth/signout",
    error: "/auth/error", // Optional error page
    newUser: "/auth/signup", // Redirect after first sign-in (for new users)
  },
};
