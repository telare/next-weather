/* eslint-disable prefer-arrow-callback */
import { tokenNames } from "@/utils/apiUtils";
import {
  inputNames,
  notifElementAttribute,
  notifs,
} from "../support/utils/authUtils";


describe("Accessibillity on the first load", () => {
  it("The entire register page should be accessbile", () => {
    cy.visit("/auth/sign-up");
    cy.injectAxe();
    cy.checkA11y();
  });
  it("The entire log-in page should be accessbile", () => {
    cy.visit("/auth/log-in");
    cy.injectAxe();
    cy.checkA11y();
  });
});

describe("Successful displaying of UI", () => {
  it("should see the registration form", () => {
    cy.visit("/auth/sign-up");

    cy.get("form[data-cy='auth-form']").should("be.visible");
    cy.get("header[data-cy='auth-form-header']").should("be.visible");

    cy.get("input[name='name'][data-cy='auth-form-name-field']").should(
      "be.visible"
    );
    cy.get("input[name='email'][data-cy='auth-form-email-field']").should(
      "be.visible"
    );
    cy.get("input[name='password'][data-cy='auth-form-password-field']").should(
      "be.visible"
    );

    cy.get("button[type='submit'][data-cy='auth-btn']").should("be.visible");
    cy.get("a[href='/auth/log-in']").should("be.visible");
  });
  it("should see the log-in form", () => {
    cy.visit("/auth/log-in");
    cy.get("form[data-cy='auth-form']").should("be.visible");
    cy.get("header[data-cy='auth-form-header']").should("be.visible");

    cy.get("input[name='email'][data-cy='auth-form-email-field']").should(
      "be.visible"
    );
    cy.get("input[name='password'][data-cy='auth-form-password-field']").should(
      "be.visible"
    );

    cy.get("button[type='submit'][data-cy='auth-btn']").should("be.visible");
    cy.get("a[href='/auth/sign-up']").should("be.visible");
  });
});

describe("Registration", () => {
  beforeEach(() => {
    cy.visit("/auth/sign-up");
    cy.fixture("user.json").then(function (user) {
      this.user = user;
    });
    inputNames.registration.forEach((fieldName) => {
      cy.get(`input[name="${fieldName}"]`).as(`${fieldName}Input`);
    });
    cy.injectAxe();
  });
  it("user should successfully register and be redirected to home", function () {
    cy.task("deleteTestUsers");
    inputNames.registration.forEach((fieldName) => {
      cy.get(`@${fieldName}Input`).type(this.user[fieldName]);
      cy.get(`@${fieldName}Input`).should("have.value", this.user[fieldName]);
    });
    cy.get("button[type=submit]").click();
    cy.get(notifElementAttribute).contains(notifs.success).as("notif");
    cy.get("@notif").should("be.visible");
    cy.checkA11y(
      { exclude: notifElementAttribute },
      {
        rules: {
          "color-contrast": { enabled: false },
        },
      }
    );

    cy.getCookie(tokenNames.access).should("exist");
    cy.getCookie(tokenNames.refresh).should("exist");
    cy.url().should("include", "/home");
    cy.get("@notif").should("not.be.visible");
  });
  context("User should fail registration", () => {
    beforeEach(() => {
      inputNames.registration.forEach((fieldName) => {
        cy.get(`input[name="${fieldName}"]`).as(`${fieldName}Input`);
      });
    });
    it("due to existing user", function () {
      inputNames.registration.forEach((fieldName) => {
        cy.get(`@${fieldName}Input`).type(this.user[fieldName]);
        cy.get(`@${fieldName}Input`).should("have.value", this.user[fieldName]);
      });

      cy.get("button[type=submit]").click();

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
    it("due to invalid email", function () {
      cy.get("@nameInput").type(this.user.email);
      cy.get("@nameInput").should("have.value", this.user.email);

      cy.get("@emailInput").type("invalidEmail");
      cy.get("@emailInput").should("have.value", "invalidEmail");

      cy.get("@passwordInput").type(this.user.password);
      cy.get("@passwordInput").should("have.value", this.user.password);

      cy.get("button[type=submit]").click();
      cy.url().should("include", "/auth/sign-up");

      cy.get("p[data-cy='auth-form-email-field-error']").as("emailError");
      cy.get("@emailError").should("be.visible");
      cy.get("@emailError").should("have.text", "Invalid email address");
      cy.checkA11y();
    });
    it("due to short password", function () {
      cy.get("@nameInput").type(this.user.name);
      cy.get("@emailInput").type(this.user.email);
      cy.get("@passwordInput").type("012");

      cy.get("button[type=submit]").click();
      cy.url().should("include", "/auth/sign-up");

      cy.get("p[data-cy='auth-form-password-field-error']").as("passwordError");
      cy.get("@passwordError").should("be.visible");
      cy.get("@passwordError").should("have.text", "At least 4 symbols");
      cy.checkA11y();
    });
    it("due to missing name field", function () {
      cy.get("@emailInput").type(this.user.email);
      cy.get("@passwordInput").type("012");

      cy.get("button[type=submit]").click();
      cy.url().should("include", "/auth/sign-up");

      cy.get("p[data-cy='auth-form-name-field-error']").as("nameError");
      cy.get("@nameError").should("be.visible");
      cy.get("@nameError").should("have.text", "At least 2 symbols");
      cy.checkA11y();
    });
  });
});

describe("Successful log-in", () => {
  beforeEach(() => {
    cy.visit("/auth/log-in");
    inputNames.logIn.forEach((fieldName) => {
      cy.get(`input[name="${fieldName}"]`).as(`${fieldName}Input`);
    });
    cy.fixture("user.json").then(function (user) {
      this.user = user;
    });
  });
  it("should successfully log-in", function () {
    cy["log-in"](this.user.email, this.user.password);
    cy.get(notifElementAttribute).contains(notifs.success).as("notif");
    cy.get("@notif").should("be.visible");

    cy.url().should("include", "/home");
    cy.getCookie("accessToken").should("exist");
    cy.getCookie("refreshToken").should("exist");
  });
  context("User should fail log-in with invalid credentials", () => {
    it("User should fail due to incorrect email", function () {
      cy.get("@emailInput").type("incorrectEmail");
      cy.get("@passwordInput").type(this.user.password);

      cy.get("@emailInput").should("have.value", "incorrectEmail");
      cy.get("@passwordInput").should("have.value", this.user.password);

      cy.get("button[type='submit']").click();
      cy.url().should("include", "/auth/log-in");
    });
    it("User should fail due to incorrect password", function () {
      cy.get("@emailInput").type(this.user.email);
      cy.get("@passwordInput").type("incorrectPassword");

      cy.get("@emailInput").should("have.value", this.user.email);
      cy.get("@passwordInput").should("have.value", "incorrectPassword");

      cy.get("button[type='submit']").click();
      cy.url().should("include", "/auth/log-in");
    });
  });
});
