type JWTtokens = {
  accessToken: string;
  refreshToken: string;
};
function isJWTtokens(tokens: unknown): tokens is JWTtokens {
  if (
    typeof tokens !== "object" ||
    typeof tokens == undefined ||
    tokens == null
  ) {
    return false;
  }
  return true;
}


describe("Next-weather API routes", () => {
  context("/auth", () => {
    context("/sign-up", () => {
      before(() => {
        cy.task("deleteTestUsers");
      });
      it("should register user with valid form data", () => {
        cy.api("POST", "/api/auth/sign-up", {
          id: "2",
          name: "TestUSERNAME",
          email: "test@test.io",
          password: "13211fdf",
        }).as("register");
        cy.get("@register").should((response) => {
          expect(response).to.have.property("status", 201);
        });
      });
      it("should fail caused by already used email", () => {
        cy.api({
          method: "POST",
          url: "/api/auth/sign-up",
          body: {
            id: "2",
            name: "TestUSERNAME",
            email: "test@test.io",
            password: "13211fdf",
          },
          failOnStatusCode: false,
        }).as("register");
        cy.get("@register").should((response) => {
          expect(response).to.have.property("status", 409);
        });
      });
    });
    context("/log-in", () => {
      it("should log-in", () => {
        cy.api({
          method: "POST",
          url: "/api/auth/log-in",
          body: {
            id: "2",
            name: "TestUSERNAME",
            email: "test@test.io",
            password: "13211fdf",
          },
          failOnStatusCode: false,
        }).as("logIn");
        cy.get("@logIn").should((response) => {
          expect(response).to.have.property("status", 201);
        });
      });
      it("should fail due to invalid password", () => {
        cy.api({
          method: "POST",
          url: "/api/auth/log-in",
          body: {
            id: "2",
            name: "TestUSERNAME",
            email: "test@test.io",
            password: "1_13211fdf",
          },
          failOnStatusCode: false,
        }).as("logIn");
        cy.get("@logIn").should((response) => {
          expect(response).to.have.property("status", 401);
        });
      });
    });
    context("/refresh", () => {
      it("should update tokens", () => {
        const user = {
          id: "1",
          name: "user",
          email: "user@test.io",
        };
        const JWTsecret = Cypress.env("JWT_SECRET_KEY");

        cy.task("generateJwtTokens", { user, secret: JWTsecret }).then(
          (tokens: unknown) => {
            if (!isJWTtokens(tokens)) {
              throw new Error("invalid cypress task return value data type");
            }
            const accessToken = tokens.accessToken;
            const refreshToken = tokens.refreshToken;
            cy.setCookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: true,
              path: "/",
            });
            cy.setCookie("accessToken", accessToken, {
              httpOnly: true,
              secure: true,
              path: "/",
            });

            cy.api({
              method: "POST",
              url: "/auth/refresh",
              body: user,
            }).as("refresh");

            cy.get("@refresh").should((response) => {
              expect(response).to.have.property("status", 200);
              // expect(response).to.have.property("message", "Credentials updated");
            });

            cy.getCookie("accessToken").should("exist");
            cy.getCookie("refreshToken").should("exist");

            cy.getCookie("accessToken").should("not.equal", accessToken);
            cy.getCookie("refreshToken").should("not.equal", refreshToken);
          }
        );
      });
    });
  });
});
