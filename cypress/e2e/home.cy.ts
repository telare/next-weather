describe("Home page (/home) accessibility", () => {
  it("should be accessible on the first load", () => {
    cy.visit("/auth/log-in");

    cy.aliasAuthInputs("logIn");
    cy["log-in"]();

    cy.visit("/home");
    cy.injectAxe();
    // cy.checkA11y();
  });
});
