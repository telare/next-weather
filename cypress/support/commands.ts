/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
declare global {
  namespace Cypress {
    interface Chainable {
      ["log-in"](email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("log-in", (email: string, password: string) => {
  cy.get("@emailInput").type(email);
  cy.get("@emailInput").should("have.value", email);
  cy.get("@passwordInput").type(password);
  cy.get("@passwordInput").should("have.value", password);

  cy.get("button[type='submit']").click();
});

export {};
