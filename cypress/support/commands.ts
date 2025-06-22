/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { inputNames } from "./utils/authUtils";

declare global {
  namespace Cypress {
    interface Chainable {
      ["log-in"](email?: string, password?: string): Chainable<void>;
      ["sign-up"](
        name?: string,
        email?: string,
        password?: string
      ): Chainable<void>;
      aliasAuthInputs(type: "registration" | "logIn"): Chainable<void>;
    }
  }
}

Cypress.Commands.add(
  "log-in",
  (email = "example1a11@test.io", password = "d3df@gf") => {
    cy.get("@emailInput").type(email);
    cy.get("@emailInput").should("have.value", email);
    cy.get("@passwordInput").type(password);
    cy.get("@passwordInput").should("have.value", password);

    cy.get("button[type='submit']").click();
  }
);
Cypress.Commands.add(
  "sign-up",
  (name = "Andrew", email = "example1a11@test.io", password = "d3df@gf") => {
    cy.get("@nameInput").type(name);
    cy.get("@nameInput").should("have.value", name);

    cy.get("@emailInput").type(email);
    cy.get("@emailInput").should("have.value", email);

    cy.get("@passwordInput").type(password);
    cy.get("@passwordInput").should("have.value", password);

    cy.get("button[type='submit']").click();
  }
);
Cypress.Commands.add("aliasAuthInputs", (type) => {
  const fields =
    type === "registration" ? inputNames.registration : inputNames.logIn;
  fields.forEach((fieldName) => {
    cy.get(`input[name="${fieldName}"]`).as(`${fieldName}Input`);
  });
});

export {};
