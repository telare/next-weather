import { jwtTokensGenerator } from "@/utils/apiUtils";
import { PrismaClient } from "@prisma/client";
import { defineConfig } from "cypress";
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    fixturesFolder: "cypress/e2e/fixtures",
    setupNodeEvents(on, config) {
      const prisma = new PrismaClient();

      on("task", {
        async deleteTestUsers() {
          try {
            await prisma.user.deleteMany({
              where: {
                email: {
                  contains: "test.io",
                },
              },
            });

            // eslint-disable-next-line no-console
            console.log("Users with test.io in email deleted successfully.");
            return true;
          } catch (error: unknown) {
            throw error;
          }
        },
        generateJwtTokens({ user, secret }) {
          return jwtTokensGenerator(user, secret);
        },
      });

      return config;
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
