import { tokenNames } from "@/utils/apiUtils";

describe("Successful registration", () => {
  const inputFields: string[] = ["name", "email", "password"];
  beforeEach(() => {
    cy.visit("/auth/sign-up");
  });
  it("User should see the registration form", () => {
    cy.get("form").should("be.visible");
    inputFields.forEach((fieldName) => {
      cy.get(`input[name="${fieldName}"]`).should("be.visible");
    });
    cy.get("button[type=submit]").contains("Continue").should("be.visible");
  });
  it("User should successfully register and be redirected to home", () => {
    cy.fixture("user.json").then((user) => {
      inputFields.forEach((fieldName) => {
        cy.get(`input[name="${fieldName}"]`).type(user[fieldName]);
      });
    });
    cy.get("button[type=submit]").click();
    // add cheking for response status
    cy.getCookie(tokenNames.access).should("exist");
    cy.getCookie(tokenNames.refresh).should("exist");
    // add clean up for data in db
    cy.url().should("include", "/home");
  });
});