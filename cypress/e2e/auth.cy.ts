import { tokenNames } from "@/utils/apiUtils";
import { notifElementAttribute, notifs } from "../support/utils/authUtils";
import { generateFieldDataCy } from "@/shared/components/Form/FormField.cy";
const prefix = "auth";
describe("Successful displaying of UI", () => {
  it("should see the registration form", () => {
    cy.visit("/auth/sign-up");

    cy.get("form[data-cy='auth-form']").should("be.visible");
    cy.get("header[data-cy='auth-form-header']").should("be.visible");

    cy.get(
      `input[name='name']${generateFieldDataCy(prefix, "name", false)}`
    ).should("be.visible");
    cy.get(
      `input[name='email']${generateFieldDataCy(prefix, "email", false)}`
    ).should("be.visible");
    cy.get(
      `input[name='password']${generateFieldDataCy(prefix, "password", false)}`
    ).should("be.visible");

    cy.get("button[type='submit'][data-cy='auth-btn']").should("be.visible");
    cy.get("a[href='/auth/log-in']").should("be.visible");
  });
  it("should see the log-in form", () => {
    cy.visit("/auth/log-in");
    cy.get("form[data-cy='auth-form']").should("be.visible");
    cy.get("header[data-cy='auth-form-header']").should("be.visible");

    cy.get(
      `input[name='email']${generateFieldDataCy(prefix, "email", false)}`
    ).should("be.visible");
    cy.get(
      `input[name='password']${generateFieldDataCy(prefix, "password", false)}`
    ).should("be.visible");

    cy.get("button[type='submit'][data-cy='auth-btn']").should("be.visible");
    cy.get("a[href='/auth/sign-up']").should("be.visible");
  });
});
describe("Registration", () => {
  beforeEach(() => {
    cy.visit("/auth/sign-up");
    cy.injectAxe();
    cy.aliasAuthInputs("registration");
  });
  it("user should successfully register and be redirected to home", () => {
    cy.task("deleteTestUsers");

    cy["sign-up"]();

    cy.get(notifElementAttribute).contains(notifs.success).as("notif");
    cy.get("@notif").should("be.visible");

    cy.getCookie(tokenNames.access).should("exist");
    cy.getCookie(tokenNames.refresh).should("exist");
    cy.url().should("include", "/home");
    cy.get("@notif").should("not.be.visible");
  });
  context("User should fail registration", () => {
    it("due to existing user", () => {
      cy["sign-up"]();

      cy.get(notifElementAttribute).contains(notifs.failed).as("notif");
      cy.get("@notif").should("be.visible");
      cy.checkA11y(
        { exclude: notifElementAttribute },
        {
          rules: {
            "color-contrast": { enabled: false },
          },
        }
      );

      cy.url().should("include", "/auth/sign-up");
      cy.get("@notif").should("not.be.visible");
    });
    it("due to invalid email", () => {
      cy["sign-up"](undefined, "invalidEmail", undefined);

      cy.url().should("include", "/auth/sign-up");

      cy.get(`p${generateFieldDataCy(prefix, "email", true)}`).as("emailError");
      cy.get("@emailError").should("be.visible");
      cy.get("@emailError").should("have.text", "Invalid email address");
      cy.checkA11y();
    });
    it("due to short password", () => {
      cy["sign-up"](undefined, undefined, "012");

      cy.url().should("include", "/auth/sign-up");

      cy.get(`p${generateFieldDataCy(prefix, "password", true)}`).as(
        "passwordError"
      );
      cy.get("@passwordError").should("be.visible");
      cy.get("@passwordError").should("have.text", "At least 4 symbols");
      cy.checkA11y();
    });
    it("due to missing name field", () => {
      cy.get("@emailInput").type("example1a11@test.io");
      cy.get("@emailInput").should("have.value", "example1a11@test.io");

      cy.get("@passwordInput").type("d3df@gf");
      cy.get("@passwordInput").should("have.value", "d3df@gf");

      cy.get("button[type='submit']").click();
      cy.url().should("include", "/auth/sign-up");

      cy.get(`p${generateFieldDataCy(prefix, "name", true)}`).as("nameError");
      cy.get("@nameError").should("be.visible");
      cy.get("@nameError").should("have.text", "At least 2 symbols");
      cy.checkA11y();
    });
  });
});

describe("Successful log-in", () => {
  beforeEach(() => {
    cy.visit("/auth/log-in");
    cy.aliasAuthInputs("logIn");
  });
  it("should successfully log-in", () => {
    cy["log-in"]();

    cy.get(notifElementAttribute).contains(notifs.success).as("notif");
    cy.get("@notif").should("be.visible");

    cy.url().should("include", "/home");
    cy.getCookie("accessToken").should("exist");
    cy.getCookie("refreshToken").should("exist");
  });
  context("User should fail log-in with invalid credentials", () => {
    it("User should fail due to incorrect email", () => {
      cy["log-in"]("incorrectEmail");

      cy.url().should("include", "/auth/log-in");
    });
    it("User should fail due to incorrect password", () => {
      cy["log-in"](undefined, "incorrectPassword");

      cy.url().should("include", "/auth/log-in");
    });
  });
});
