import { User } from "@/shared/types/User";
import { SecuredUser } from "@/utils/apiUtils";

type JWTtokens = {
  accessToken: string;
  refreshToken: string;
};

export function isJWTtokens(tokens: unknown): tokens is JWTtokens {
  if (typeof tokens !== "object" || tokens == null) {
    return false;
  }
  const potentialTokens = tokens as Record<string, unknown>;
  if (
    typeof potentialTokens.accessToken == "string" &&
    typeof potentialTokens.refreshToken == "string"
  ) {
    return true;
  }
  return false;
}

describe("Next-weather API routes", () => {
  const JWTsecret = Cypress.env("JWT_SECRET_KEY");
  const securedUser: SecuredUser = {
    id: "1",
    name: "user",
    email: "user@test.io",
  };
  const user: User = {
    id: "2",
    name: "TestUSERNAME",
    email: "test@test.io",
    password: "13211fdf",
  };
  context("/auth", () => {
    context("/sign-up", () => {
      before(() => {
        cy.task("deleteTestUsers");
      });
      it("should register user with valid form data", () => {
        cy.api("POST", "/api/auth/sign-up", user).as("register");
        cy.get("@register").should((response) => {
          expect(response).to.have.property("status", 201);
        });
      });
      it("should fail caused by already used email", () => {
        cy.api({
          method: "POST",
          url: "/api/auth/sign-up",
          body: user,
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
          body: user,
        }).as("logIn");
        cy.get("@logIn").should((response) => {
          expect(response).to.have.property("status", 201);
        });
      });
      it("should fail due to invalid password", () => {
        cy.api({
          method: "POST",
          url: "/api/auth/log-in",
          body: { ...user, password: "13211fdsf" },
          failOnStatusCode: false,
        }).as("logIn");
        cy.get("@logIn").should((response) => {
          expect(response).to.have.property("status", 401);
        });
      });
    });

    context("/refresh", () => {
      it("should update both tokens", () => {
        cy.setAuthCookies(securedUser, JWTsecret).then(() => {
          cy.api({
            method: "POST",
            url: "api/auth/refresh",
            body: securedUser,
          }).as("refresh");

          cy.get("@refresh").should((response) => {
            expect(response).to.have.property("status", 200);
          });
          cy.getCookie("accessToken").should("exist");
          cy.getCookie("refreshToken").should("exist");
        });
      });
    });
  });

  context("/current-weather", () => {
    context("/pollution", () => {
      const url: string = "/api/current-weather/pollution";
      const validLatLon: string = "55";
      const urlParams: string = `?lat=${validLatLon}&lon=${validLatLon}`;
      const invalidParams: string = `?a=${validLatLon}&b=${validLatLon}`;
      const validURL: string = url + urlParams;
      context("Success", () => {
        it("should send back pollution info based on city", () => {
          cy.setAuthCookies(securedUser, JWTsecret);
          cy.api("GET", url + urlParams).then((response) => {
            expect(response).to.have.property("status", 200);
          });
        });
      });

      context("Fail due to", () => {
        it("unauthorized", () => {
          cy.api({
            method: "GET",
            url: validURL,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response).to.have.property("status", 401);
          });
        });

        context("authorized", () => {
          beforeEach(() => {
            cy.setAuthCookies(securedUser, JWTsecret);
          });
          it("invalid search params", () => {
            cy.request({
              method: "GET",
              url: url + invalidParams,
              failOnStatusCode: false,
            }).then((response) => {
              expect(response).to.have.property("status", 400);
            });
          });
          it("invalid search params type", () => {
            cy.request({
              method: "GET",
              url: url + "?lat=undefined&lon=10",
              failOnStatusCode: false,
            }).then((response) => {
              expect(response).to.have.property("status", 400);
            });
          });
          it("invalid HTTP method", () => {
            cy.api({
              method: "POST",
              url: validURL,
              failOnStatusCode: false,
            }).then((response) => {
              expect(response).to.have.property("status", 405);
            });
          });
        });
      });
    });
  });
});
